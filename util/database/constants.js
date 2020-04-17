const mongoose = require('mongoose');
const Schema = mongoose.Schema

const constant = new Schema({
    type: String,
    downTime: Array,
    idealCycleRate: Object,
})

module.exports = mongoose.model('Constant', constant);