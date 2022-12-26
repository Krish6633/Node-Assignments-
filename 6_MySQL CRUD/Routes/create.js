const express = require('express');
const Joi = require('joi');
const conn = require('../Database/conn');
const router = express.Router();

router.post('/user', (req, res) => {


    let schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        branch: Joi.string().required(),
        name: Joi.string().required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        conn.query(`INSERT INTO details(id, name, email, branch) VALUES ('','${req.body.name}','${req.body.email}','${req.body.branch}')`, (err, result) => {
            if (!err) {
                res.status(200).send("Data inserted...");
            }
        });
    }
});

module.exports = router;