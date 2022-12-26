const user = require('../Database/model');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

router.post('/fetch', async(req, res) => {

    let schema = Joi.object({
        startdate: Joi.string().required(),
        enddate: Joi.string().required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        let data = await user.find({
            date: {
                $gte: req.body.startdate, // + 'T00:00:00.000Z', // Date("2022-12-20"),
                $lt: req.body.enddate // + 'T00:00:00.000Z' //Date("2022-12-25")
            }
        });
        res.status(200).send(data);
    }
});

module.exports = router;