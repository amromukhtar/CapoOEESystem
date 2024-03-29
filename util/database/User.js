const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    authority: {
        type: String,
        required: true,
    }

})

module.exports = mongoose.model('User', userSchema)