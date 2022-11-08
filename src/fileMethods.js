const fs = require("fs");
const path = require("path");

class File {
  constructor() {}

  readFile(filename) {
    // Read a file asynchronously from the file path
    // Note: utf8 is the default encoding..
    const data = fs.readFileSync(filename, "utf8");
    return data;
  }

  writeFile(filename, json) {
    //write file into metadata.json
    let filename = path.join(
      filename,
      `metadata-${Math.floor(1000 + Math.random() * 900000)}.json`
    );
    fs.writeFileSync(filePath, json);
  }
}

module.exports = File;
