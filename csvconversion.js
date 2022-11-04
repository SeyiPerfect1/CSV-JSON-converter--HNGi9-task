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
    const header = dataArray[0];
    const newHeader = header.split(",");
    let teamName;

    //iterate through the array generated from first entrie leaving out the header(start iterating from index 1)
    for (let i = 1; i < dataArray.length - 1; i++) {
      let eachDetails = dataArray[i];

      //replace all , in the entries with "|" while leaving out , in entries that has , seperated values
      //this is done with the regular expression
      const strReplace = eachDetails.replace(/,(?=\S)/g, "|");
      let fieldArray = strReplace.split("|");

      //get index of headers
      let seriesIndex = newHeader.indexOf("Series Number");
      let nameIndex = newHeader.indexOf("Name");
      let descriptionIndex = newHeader.indexOf("Description");
      let genderIndex = newHeader.indexOf("Gender");
      let attributesIndex = newHeader.indexOf("Attributes");
      let UUIDIndex = newHeader.indexOf("UUID");
      let seriesValue = fieldArray[seriesIndex].slice(0);

      let atrributeField;
      if (fieldArray.length === 8) {
        atrributeField = fieldArray.slice(6, 7).toString().split(";");
        //generate mint-name for each details if the row has the team name
        teamName = fieldArray[0].slice(1);
      }

      if (fieldArray.length === 7) {
        atrributeField = fieldArray.slice(5, 6).toString().split(";");
        seriesIndex = newHeader.indexOf("Series Number") - 1;
        nameIndex = newHeader.indexOf("Name") - 1;
        descriptionIndex = newHeader.indexOf("Description") - 1;
        genderIndex = newHeader.indexOf("Gender") - 1;
        attributesIndex = newHeader.indexOf("Attributes") - 1;
        UUIDIndex = newHeader.indexOf("UUID") - 1;
        seriesValue = fieldArray[seriesIndex].slice(1);
      }

      //the result was built into an object according to the details
      let result = {
        format: "CHIP-0007",
        name: `${fieldArray[nameIndex]}`,
        description: `${fieldArray[descriptionIndex]}`,
        minting_tool: `${teamName}`,
        sensitive_content: false,
        series_number: `${seriesValue}`,
        series_total: `${dataArray.length - 1}`,
        attributes: [
          {
            trait_type: "gender",
            value: `${fieldArray[genderIndex]}`,
          },
          {
            trait_type: "hair",
            value: `${atrributeField[0].split(": ")[1]}`,
          },
          {
            trait_type: "eyes",
            value: `${atrributeField[1].split(": ")[1]}`,
          },
          {
            trait_type: "teeth",
            value: `${atrributeField[2].split(": ")[1]}`,
          },
          {
            trait_type: "clothing",
            value: `${atrributeField[3].split(": ")[1]}`,
          },
          {
            trait_type: "accessories",
            value: `${atrributeField[4].split(": ")[1]}`,
          },
          {
            trait_type: "expressions",
            value: `${atrributeField[5].split(": ")[1]}`,
          },
          {
            trait_type: "strength",
            value: `${atrributeField[6].split(": ")[1]}`,
          },
          {
            trait_type: "weekness",
            value: `${atrributeField[7].split(": ")[1]}`,
          },
        ],
        collection: {
          name: "Zuri NFT Tickets for Free Lunch",
          id: `${fieldArray[UUIDIndex]}`,
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

      //save the hash function in the hash field of the json data
      result.data["Sha256 hash"] = hash;

      //stringify the new result
      var jsonGenerated1 = JSON.stringify(result, null, 4);

      // write the result into metadata.json
      new File().writeFile(onlypath, jsonGenerated1);
    }
  }
}
const newData = new DeriveMetadata();
module.exports = newData;
