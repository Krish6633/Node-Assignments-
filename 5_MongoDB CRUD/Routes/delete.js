const express = require('express');
const mongodb = require('mongodb');
const colle = require('../Database/conn');
const router = express.Router();

router.delete('/user/:id', async(req, res) => {
    let user = await colle();
    let result = await user.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (result.acknowledged == true)
        res.status(200).send("data deleted...");
    console.log(result);
});

module.exports = router;