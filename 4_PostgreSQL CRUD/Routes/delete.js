const express = require('express');
const pool = require('../Database/conn');
const router = express.Router();

router.delete('/user/:id', (req, res) => {

    pool.query(`DELETE FROM public.user WHERE id = ${req.params.id}`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send("Record deleted...");
    })
});

module.exports = router;