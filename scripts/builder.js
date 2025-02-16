import fs from "node:fs/promises";
import { extname, dirname, basename } from "node:path";
import { minify } from "html-minifier";
import { glob } from "glob";
import * as UglifyJS from "uglify-js";

import i18nConfig from "../i18n/config.js";

const devFolder = "src";
const distFolder = "dist";

await fs.rm("./" + distFolder, { recursive: true, force: true });
await fs.mkdir("./" + distFolder);

const files = await glob(devFolder + '/**/*');

const getCurrentDateForXML = () => {
  const now = new Date();
  const offset = '+03:00';
  const pad = (num) => String(num).padStart(2, '0');

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${offset}`;
};

for (const file of files) {
  await handleChangeOnPath(file);
}

export default async function handleChangeOnPath(path) {
  const extension = extname(path);

  if (!extension) return;
  if (path.includes('builder-components/')) return;

  if ([".html"].includes(extension)) {
    let fileContent = await fs.readFile(path, "utf-8");
    const componentsToInclude = [...fileContent.matchAll(/<!--\s*include:builder-components\/([\w-]+\.html)\s*-->/g)].map(match => match[1]);

    for (const component of componentsToInclude) {
      const componentContent = await fs.readFile(`${devFolder}/builder-components/${component}`, "utf-8");
      fileContent = fileContent.replaceAll(`<!-- include:builder-components/${component} -->`, componentContent);
    }

    let minified = minify(fileContent, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      keepClosingSlash: true,
    });

    i18nConfig.forEach(async (lang) => {
      const translations = await import(`../i18n/${lang.file}`);
      let finalHTML = minified;

      for (const key of Object.keys(translations.default)) {
        if (typeof translations.default[key] === "string") {
          finalHTML = finalHTML.replaceAll(`%${key}%`, translations.default[key]);
        } else {
          for (const subkey of Object.keys(translations.default[key])) {
            finalHTML = finalHTML.replaceAll(`%${key}.${subkey}%`, translations.default[key][subkey]);
          }
        }
      }

      const newPathName = path.replace(devFolder, `${distFolder}${lang.path}`);
      if (!newPathName.includes('/web-components')) {
        const canonical = dirname(newPathName).replace(distFolder, '');
        finalHTML = finalHTML.replaceAll('/%canonical%', canonical + "/");
      }

      await fs.mkdir(dirname(newPathName), { recursive: true });
      await fs.writeFile(newPathName, finalHTML);
    });
  } else if (extension === ".css") {
    const fileContent = await fs.readFile(path, "utf-8");
    const minified = minify(fileContent, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: false,
      minifyCSS: true,
      keepClosingSlash: true,
    });

    const newPathName = path.replace(devFolder, distFolder);
    await fs.mkdir(dirname(newPathName), { recursive: true });
    await fs.writeFile(newPathName, minified);
  } else if (extension === ".js") {
    const fileContent = await fs.readFile(path, "utf-8");
    const minified = UglifyJS.minify(fileContent);

    const newPathName = path.replace(devFolder, distFolder);
    await fs.mkdir(dirname(newPathName), { recursive: true });
    await fs.writeFile(newPathName, minified.code);
  } else if (basename(path) === "sitemap.xml") {
    let fileContent = await fs.readFile(path, "utf-8");
    const currentDate = getCurrentDateForXML();

    const newPathName = path.replace(devFolder, distFolder);
    await fs.mkdir(dirname(newPathName), { recursive: true });
    await fs.writeFile(newPathName, fileContent.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`));
  } else {
    try {
      await fs.stat(path); // Will throw error if the file doesn't exist
      await fs.mkdir(dirname(path.replace(devFolder, distFolder)), { recursive: true });
      await fs.copyFile(path, path.replace(devFolder, distFolder));
    } catch (_) {
      await fs.rm(path.replace(devFolder, distFolder), { recursive: true, force: true });
    }
  }
}

console.log(`🟢 Project build!`);