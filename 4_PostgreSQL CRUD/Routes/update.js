const express = require('express');
const pool = require('../Database/conn');
const router = express.Router();

router.put('/user/:id', (req, res) => {

    pool.query(`UPDATE public.user SET name = $1, address = $2 WHERE id = ${req.params.id}`, [req.body.name, req.body.address], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send("Record updated...");
    })
});

module.exports = router;