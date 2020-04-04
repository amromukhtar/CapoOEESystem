const mongoose = require('mongoose');
const Schema = mongoose.Schema

const constant = new Schema({
    type: String,
    downTime: [],
    cycleTime: [],
})

module.exports = mongoose.model('Constant', constant);