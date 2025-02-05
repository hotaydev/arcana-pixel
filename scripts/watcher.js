import { exec } from "node:child_process";
import fs from "node:fs/promises";
import chokidar from "chokidar";
import { glob } from "glob";

import handleChangeOnPath from "./builder.js";

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

console.log(`🟢 Project up on http://localhost:3000`);
exec("npm start");