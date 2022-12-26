const user = require('../Database/model');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/insert', async(req, res) => {

    let schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        address: Joi.string().required(),
        name: Joi.string().required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        let rawdata = req.body;
        rawdata.date = Date.now();
        let data = new user(rawdata);
        let result = await data.save();
        res.status(200).send("Data inserted...");
    }
});

module.exports = router;