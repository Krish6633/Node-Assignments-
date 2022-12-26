const express = require('express');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const multer = require('multer');
var path = require('path')

const apiDocumentation = YAML.load("./api.yaml");
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocumentation));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
}).single("file_upload");

app.post('/files', upload, (req, res) => {
    res.send("File uploaded at " + __dirname + "/Uploads")
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started...."));