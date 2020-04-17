const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const router = require('./routes/main-routes');
const constant = require('./data/constants');

const serial = require('./util/serialData');
const Batch = require('./Models/Batch');

const batch1 = new Batch();
const batch2 = new Batch();
const batch3 = new Batch();
const batch4 = new Batch();
const batch5 = new Batch();
const batch6 = new Batch();

serial.handleSensorsData();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'capo oee system', saveUninitialized: false, resave: false }));

app.use(router);

mongoose.connect('mongodb://localhost/database', (result) => {
    console.log('Mongo DB Connected');
    constant.getFactors();
});

//Mongoose v5
// .then((result) => {
//     console.log('Mongo DB Connected');
//     constant.getFactors();
// })
// .catch((err) => {
//     console.log(err)
// })

const server = app.listen(3000);
const io = require('socket.io')(server);

io.on('connection', socket => {
    // console.log('Client Connected');
})

module.exports.sendData = (event, message) => {
    io.sockets.emit(event, message);
}

// global.downTime = [10, 10, 10, 10, 10, 10];
// global.idealCycleRate = {
//     Trepko_A: [180, 138, 138, 138, 138, 138, 138],
//     Trepko_B: [100, 72],
//     Trepko_C: [50, 50],
//     Erca_A: [300, 300, 360],
//     Erca_B: [300, 300, 300, 300, 360, 300],
//     NovaPak: [28],
// };

module.exports.batch1 = batch1;
module.exports.batch2 = batch2;
module.exports.batch3 = batch3;
module.exports.batch4 = batch4;
module.exports.batch5 = batch5;
module.exports.batch6 = batch6;



