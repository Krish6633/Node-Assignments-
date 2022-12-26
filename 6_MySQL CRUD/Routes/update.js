const express = require('express');
const conn = require('../Database/conn');
const router = express.Router();

router.put('/user/:id', (req, res) => {

    conn.query(`UPDATE details SET name='${req.body.name}',email='${req.body.email}',branch='${req.body.branch}' WHERE id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.status(200).send("Data Updated...");
        }
    });
});

module.exports = router;