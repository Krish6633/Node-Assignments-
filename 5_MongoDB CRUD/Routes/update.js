const express = require('express');
const mongodb = require('mongodb');
const colle = require('../Database/conn');
const router = express.Router();

router.put('/user/:id', async(req, res) => {

    let user = await colle();
    let result = await user.update({ _id: new mongodb.ObjectId(req.params.id) }, { $set: { name: req.body.name } });
    if (result.acknowledged == true)
        res.status(200).send("data updated...");
    console.log(result);

});

module.exports = router;