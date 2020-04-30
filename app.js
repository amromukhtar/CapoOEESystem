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

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'capo oee system', saveUninitialized: false, resave: false }));

app.use(router);

mongoose.connect('mongodb://localhost/section1');

var db = mongoose.connection;
db.on('error', () => {
    console.log('Connection Error');
});

db.once('connected', () => {

    console.log('Connected to the database');
    constant.getFactors();

    const server = app.listen(3000);
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // console.log('Client Connected');
    })

    module.exports.sendData = (event, message) => {
        io.sockets.emit(event, message);
    }

    serial.handleSensorsData();
    module.exports.batch1 = batch1;
    module.exports.batch2 = batch2;
    module.exports.batch3 = batch3;
    module.exports.batch4 = batch4;
    module.exports.batch5 = batch5;
    module.exports.batch6 = batch6;
});

db.on('disconnected', () => {
    console.log('Database disconnected');
});

//Mongoose v5
// .then((result) => {
//     console.log('Mongo DB Connected');
//     constant.getFactors();
// })
// .catch((err) => {
//     console.log(err)
// })





