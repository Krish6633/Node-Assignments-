const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const loginRoute = require('./Routes/login');
const registerRoute = require('./Routes/register');
const verificationRoute = require('./Routes/verify');

const apiDocumentation = YAML.load("./api.yaml");
const app = express();

const url = "mongodb://127.0.0.1:27017/Users";
mongoose.connect(url, { useNewUrlParser: true }).then(() => console.log("Mongoose connected")).catch((err) => console.log(err));
mongoose.set('strictQuery', false);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocumentation));
app.use(express.json());
app.use('/', loginRoute);
app.use('/', registerRoute);
app.use('/', verificationRoute);
app.get('/', (req, res) => {
    res.send("Connected...");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}.....`));