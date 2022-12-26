const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const user = require('../Models/user');
const key = require('../Authorization/key');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async(req, res) => {

    let schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(4).required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        let details = await user.findOne({ email: req.body.email });
        if (!details) {
            return res.status(404).send("User not Found");
        } else {
            bcrypt.compare(req.body.password, details.password, function(err, result) {
                if (result) {
                    let token = jwt.sign(req.body, key);
                    res.status(200).send({
                        Status: "Login Successfully...",
                        token
                    });
                }

            });
        }
    }



});

module.exports = router;