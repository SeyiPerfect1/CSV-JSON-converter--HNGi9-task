const File = require("./fileMethods");
const { hashFunction } = require("./hash");
const path = require("path");

class DeriveMetadata {
  constructor() {}

  deriveJSON(filepath) {
    //get the filename coming from the input
    const filename = path.basename(filepath);

    //get the directory name coming from the input
    const onlypath = path.dirname(filepath);

    // read the file
    const data = new File().readFile(filepath);

    //split the datacoming from the file into dataArray
    const dataArray = data.toString().split("\r");

    //iterate through the array generated from first entrie leaving out the header(start iterating from index 1)
    for (let i = 1; i < dataArray.length - 1; i++) {
      let eachDetails = dataArray[i];

      //replace all , in the entries with "|" while leaving out , in entries that has , seperated values
      //this is done with the regular expression
      const strReplace = eachDetails.replace(/,(?=\S)/g, "|");
      let fieldArray = strReplace.split("|");

      //the result was built into an object according to the details
      let result = {
        format: "CHIP-0007",
        name: `${fieldArray[1]}`,
        description: `${fieldArray[2]}`,
        minting_tool: `${filename}`,
        sensitive_content: false,
        series_number: `${fieldArray[1]}`,
        series_total: `${dataArray.length - 1}`,
        attributes: [
          {
            trait_type: "gender",
            value: `${fieldArray[3]}`,
          },
        ],
        collection: {
          name: "Zuri NFT Tickets for Free Lunch",
          id: `${fieldArray[4]}`,
          attributes: [
            {
              type: "description",
              value: "Rewards for accomplishments during HNGi9.",
            },
          ],
        },
        data: {
          "Sha256 hash": "",
        },
      };

      //output stringify
      var jsonGenerated = JSON.stringify(result, null, 4);

      //implement hash function to generate the hash value of the json data
      var hash = hashFunction(jsonGenerated);
      console.log(hash);

      //save the hash function in the hash field of the json data
      result.data["Sha256 hash"] = hash;

      //stringify the new result
      var jsonGenerated1 = JSON.stringify(result, null, 4);

      //write the result into metadata.json
      new File().writeFile(onlypath, jsonGenerated1);
    }
  }
}
const newData = new DeriveMetadata();

module.exports = newData;
