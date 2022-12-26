const express = require('express');
const conn = require('../Database/conn');
const router = express.Router();

router.get('/user', (req, res) => {

    conn.query("SELECT * FROM `details`", (err, result) => {
        if (!err) {
            res.status(200).send(result);
        }
    });
});

router.get('/user/:id', (req, res) => {

    conn.query(`SELECT * FROM details WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        }
    });
});

module.exports = router;