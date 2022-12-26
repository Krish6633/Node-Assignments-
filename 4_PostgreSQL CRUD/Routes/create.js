const express = require('express');
const Joi = require('joi');
const pool = require('../Database/conn');
const router = express.Router();

router.post('/user', (req, res) => {

    let schema = Joi.object({
        name: Joi.string().required(),
        id: Joi.number().integer().required(),
        address: Joi.string().required()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        pool.query(`INSERT INTO public.user (name,id,address) VALUES ($1, $2, $3)`, [req.body.name, req.body.id, req.body.address], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send("Record created...");
        })
    }
});

module.exports = router;