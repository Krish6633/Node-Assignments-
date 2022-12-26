const express = require('express');
const colle = require('../Database/conn');
const router = express.Router();

router.get('/user', async(req, res) => {

    let user = await colle();
    let data = await user.find().toArray();
    res.status(200).send(data);
});

module.exports = router;