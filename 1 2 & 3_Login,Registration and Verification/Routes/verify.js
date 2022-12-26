const express = require('express');
const key = require('../Authorization/key');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/verify', (req, res) => {

    let token = req.headers['authorization'];
    console.log(req.headers);
    if (!token) {
        return res.status(404).send("Token not found");
    } else {

        try {
            let verified = jwt.verify(token, key);
            if (verified) {
                res.status(200).send("User successfully verified...");
            } else {
                return res.status(401).send("Unauthorized user");
            }
        } catch (err) {
            res.status(401).send("Unauthorized user");
        }

    }
});

module.exports = router;