const express = require('express');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const reader = require('./Routes/read');
const creater = require('./Routes/create');
const updater = require('./Routes/update');
const deleter = require('./Routes/delete');

const apiDocumentation = YAML.load("./api.yaml");
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocumentation));
app.use(express.json());
app.use('/', reader);
app.use('/', creater);
app.use('/', updater);
app.use('/', deleter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is started....."));