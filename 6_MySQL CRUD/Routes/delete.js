const express = require('express');
const conn = require('../Database/conn');
const router = express.Router();

router.delete('/user/:id', (req, res) => {
    conn.query(`DELETE FROM details WHERE id=${req.params.id}`, (err, result) => {

        if (!err) {
            res.status(200).send("Data deleted...");
        }
    });
});

module.exports = router;