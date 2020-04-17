const mongoose = require('mongoose');
const Schema = mongoose.Schema;

batchSchema = new Schema({
    fullDate: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    batchNo: {
        type: String,
        required: true
    },
    machine: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
    target: {
        type: String,
        required: true
    },
    actual: {
        type: String,
        required: true
    },
    ppt: {
        type: String,
        required: true
    },
    pst: {
        type: String,
        required: true
    },
    runTime: {
        type: String,
        // required: true
    },
    totalTime: {
        type: String,
        // required: true
    },
    cycleRate: {
        type: String,
        // required: true
    },
    meff: {
        type: String,
        required: true
    },
    downTime: {
        type: String,
        required: true
    },
    oee: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    performance: {
        type: String,
        required: true
    },
    supervisor: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Batch', batchSchema);



// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./util/database/database.db');

// exports.addBatch = (...args) => {
//     console.log(args)
//     return new Promise((resolve, reject) => {
//         db.run('INSERT INTO BATCHES VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
//             args, function (err) {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(this.lastID);
//             }
//         )
//     })
// }