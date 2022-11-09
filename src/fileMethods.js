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
    //write to a file synchronously
    fs.writeFileSync(filename, json);
  }

  appendFile(filename, data){
    //append to an already exissting file
    fs.appendFile(filename, data, (err) => {
      if (err) throw err;
    })
  }
}

module.exports = File;
