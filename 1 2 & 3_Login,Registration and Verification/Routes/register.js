const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const user = require('../Models/user');
var nodemailer = require('nodemailer');
const router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '190420116031.it19@scet.ac.in',
        pass: '***'
    }
});

var mailOptions = {
    from: '190420116031.it19@scet.ac.in',
    to: '190420116031.it19@scet.ac.in,krishkkevadiya6633@gmail.com',
    subject: 'Registered Successfully',
    html: '<h1>REGISTRATION </h1><p>You have successfully register on register API of krish kevadiya</p>'
};

router.post('/register', async(req, res) => {

    let schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(4).required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/),
        dob: Joi.date()
    });
    let { error } = schema.validate(req.body);
    if (error) {
        return res.send(error.details[0].message);
    } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;
        let data = new user(req.body);
        await data.save(function(err, result) {
            if (err)
                res.send(err);
            else {
                res.status(200).send("Registered successfully...");
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent...");
                    }
                });
            }
        });

    }
});

module.exports = router;