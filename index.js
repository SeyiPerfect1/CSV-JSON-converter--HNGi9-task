const express = require('express');
require("dotenv").config();
const newData = require("./csvconversion")
const ejs = require('ejs');
const { nextTick } = require('process');

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/api/file", (req, res) => {
    res.render("fileinput.ejs")
});

app.post("/api/file",  (req, res, next) => {
    const { text } = req.body
    try{
    newData.deriveJSON(text);
    res.status(200).json({
        message: "file created successfuly in the same folder"
    })
    }catch(err){
        next(err)
    }
});

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
})