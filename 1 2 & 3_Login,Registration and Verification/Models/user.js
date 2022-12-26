const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    mobile: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('details', userSchema);