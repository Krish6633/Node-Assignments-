const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const fetcher = require('./Routes/fetch');
const inserter = require('./Routes/insert');

const apiDocumentation = YAML.load("./api.yaml");
mongoose.connect("mongodb://127.0.0.1:27017/filter").then(() => console.log("Mongoose connected...")).catch((err) => console.log(err));
mongoose.set('strictQuery', false);
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocumentation));

app.use(express.json());
app.use('/', fetcher);
app.use('/', inserter);

const port = process.env.PORT || 5000
app.listen(port, () => console.log("Server started..."));