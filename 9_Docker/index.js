const pdf = require("pdf-creator-node");
const fs = require("fs");
const options = require('./options');
const users = require('./data');
var html = fs.readFileSync("template.html", "utf8");

var document = {
    html: html,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "",
};

pdf
    .create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });