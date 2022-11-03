const fs = require("fs");
const path = require("path");

function convertToJSON(file) {
  const csvFilePath = path.join(__dirname, "team_bevel.csv");

  // Read a file asynchronously from the file path
  // Note: utf8 is the default encoding..
  const data = fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("File read successfully");
    console.log(data);
  });

}


