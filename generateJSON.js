const DeriveMetadata = require("./src/csvconverter");
const readline = require("readline").createInterface({
    input: process.stdin,
    otput: process.stdout,
});

console.log(`welcome, Enter the csv filename and your team name (eg Team_Bevel.csv:Team Bevel):`);
readline.prompt()

readline.on('line', (filename) => {
    console.log(`Processing: ${filename.split(":")[0]}`);
    new DeriveMetadata().deriveJSON(filename);
    readline.close();
    console.log("done")
});