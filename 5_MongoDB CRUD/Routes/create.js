const express = require('express');
const Joi = require('joi');
const colle = require('../Database/conn');
const router = express.Router();

router.post('/user', async(req, res) => {

    let schema = Joi.object({
        name: Joi.string().required(),
        address: Joi.string().required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        let user = await colle();
        let result = await user.insertOne(req.body);
        if (result.acknowledged == true)
            res.status(200).send("data inserted...");
        console.log(result);
    }
});

module.exports = router;