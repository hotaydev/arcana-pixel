import { exec } from "node:child_process";
import fs from "node:fs/promises";
import { extname, dirname } from "node:path";
import chokidar from "chokidar";
import { minify } from "html-minifier";
import { glob } from "glob";

import i18nConfig from "../i18n/config.js";

const devFolder = "src";
const distFolder = "dist";

await fs.rm("./" + distFolder, { recursive: true, force: true });
await fs.mkdir("./" + distFolder);

const files = await glob(devFolder + '/**/*');

for (const file of files) {
  await handleChangeOnPath(file);
}

// Watch for changes in the `/src` folder
chokidar.watch(devFolder, { ignoreInitial: true }).on("all", async (event, path) => {
  console.log(`🔄 Detected ${event} in ${path}. Fast refreshing...`);
  await handleChangeOnPath(path);
});

async function handleChangeOnPath(path) {
  const extension = extname(path);
  if (!extension) return;

  if ([".html"].includes(extension)) {
    i18nConfig.forEach(async (lang) => {
      const translations = await import(`../i18n/${lang.file}`);

      const fileContent = await fs.readFile(path, "utf-8");
      let minified = minify(fileContent, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        keepClosingSlash: true,
      });

      for (const key of Object.keys(translations.default)) {
        if (typeof translations.default[key] === "string") {
          minified = minified.replaceAll(`%${key}%`, translations.default[key]);
        } else {
          for (const subkey of Object.keys(translations.default[key])) {
            minified = minified.replaceAll(`%${key}.${subkey}%`, translations.default[key][subkey]);
          }
        }
      }

      const newPathName = path.replace(devFolder, `${distFolder}${lang.path}`);
      if (!newPathName.includes('/components')) {
        const canonical = dirname(newPathName).replace(distFolder, '');
        minified = minified.replaceAll('/%canonical%', canonical + "/");
      }

      await fs.mkdir(dirname(newPathName), { recursive: true });
      await fs.writeFile(newPathName, minified);
    });
  } else if ([".css", ".js"].includes(extension)) {
    const fileContent = await fs.readFile(path, "utf-8");
    const minified = minify(fileContent, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      keepClosingSlash: true,
    });

    const newPathName = path.replace(devFolder, distFolder);
    await fs.mkdir(dirname(newPathName), { recursive: true });
    await fs.writeFile(newPathName, minified);
  } else {
    // Static file, copy it
    await fs.mkdir(dirname(path.replace(devFolder, distFolder)), { recursive: true });
    await fs.copyFile(path, path.replace(devFolder, distFolder));
  }
}

console.log(`🟢 Project up on http://localhost:3000`);
exec("npm start");