const express = require('express');
const pool = require('../Database/conn');
const router = express.Router();

router.get('/user', (req, res) => {

    pool.query('SELECT * FROM public.user ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    })
});

router.get('/user/:id', (req, res) => {

    pool.query(`SELECT * FROM public.user WHERE id = ${req.params.id}`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(results.rows);
    })
});

module.exports = router;