const DeriveMetadata = require("./src/csvconversion");
const readline = require("readline").createInterface({
    input: process.stdin,
    otput: process.stdout,
});

readline.setPrompt(`welcome, Enter the csv filename:`);
readline.prompt()

readline.on('line', (filename, teamName) => {
    console.log(`Processing: ${filename}`);
    new DeriveMetadata().deriveJSON(filename)
    newData.deriveJSON(filename);
    readline.close();
    console.log("done")
});