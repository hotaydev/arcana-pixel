const tsj = require("ts-json-schema-generator");
const fs = require('node:fs');
const path = require('node:path');

// Read the directory contents
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for .ts files and exclude files in the exclusions array
  const tsFiles = files.filter(file => file.endsWith('.ts'));

  // Loop over the filtered files
  tsFiles.forEach(file => {
    console.log('Building schema for: ', file);

    const schema = tsj.createGenerator({
      path: file,
      type: "*",
      minify: false,
      expose: "export",
      topRef: false,
      jsDoc: "extended"
    }).createSchema("*");

    const schemaString = JSON.stringify(schema, null, 2);
    const outputPath = path.join(__dirname, "compiled", path.basename(file, ".ts") + ".json");
    fs.writeFile(outputPath, schemaString, (err) => {
      if (err) throw err;
    });
  });
});
