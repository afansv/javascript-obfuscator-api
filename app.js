const express = require("express");
const bodyParser = require("body-parser");
const JavaScriptObfuscator = require("./javascript-obfuscator.js");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

app.post("/", function(req, res) {
    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        Buffer.from(req.body.src, "base64").toString("utf-8")
    );

    res.send(
        JSON.stringify({
            result: Buffer.from(obfuscationResult.toString()).toString("base64")
        })
    );
});

app.listen(3000, function() {
    console.log("Obfuscator service listening on port 3000!");
});
