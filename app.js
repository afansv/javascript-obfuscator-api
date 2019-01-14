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
        Buffer.from(req.body.src, "base64").toString("utf-8"),
        {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            renameGlobals: false,
            rotateStringArray: true,
            selfDefending: true,
            stringArray: true,
            stringArrayEncoding: "base64",
            stringArrayThreshold: 0.75,
            transformObjectKeys: true,
            unicodeEscapeSequence: false
        }
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
