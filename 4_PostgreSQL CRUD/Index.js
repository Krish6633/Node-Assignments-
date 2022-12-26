const express = require('express');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const readRoute = require('./Routes/read');
const updateRoute = require('./Routes/update');
const createRoute = require('./Routes/create');
const deleteRoute = require('./Routes/delete');

const apiDocumentation = YAML.load("./api.yaml");
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocumentation));
app.use(express.json());
app.use('/', readRoute);
app.use('/', updateRoute);
app.use('/', createRoute);
app.use('/', deleteRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is working on PORT:${port}`))