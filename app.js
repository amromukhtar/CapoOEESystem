const path = require('path');

// const bcrypt = require('bcrypt');
// bcrypt.hash('orma', 10).then((hashed) => {
//     console.log(hashed)
// })

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const router = require('./routes/main-routes');
const constant = require('./data/constants');

const Batch = require('./models/Batch');

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


// let i = 0;
// const server = ws.createServer(function(conn) {
//     console.log("New connection")

//     conn.on("text", function(str) {
//         console.log("Received " + str)
//         conn.sendText(str.toUpperCase() + "!!!")
//     })
//     conn.on("close", function(code, reason) {
//         console.log("Connection closed", code, reason)
//     })
// }).listen(3000);

// setInterval(() => { broadcast(server, String(i++)) }, 1000);

// function broadcast(server, msg) {
//     try {
//         server.connections.forEach(function(conn) {
//             conn.sendText(msg)
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }

mongoose.connect('mongodb://localhost:27017/database')
    .then((result) => {
        console.log('Mongo DB Connected');
        constant.getFactors();
    })
    .catch((err) => {
        console.log(err)
    })
const server = app.listen(3000);
const io = require('socket.io')(server);

io.on('connection', socket => {
    // console.log('Client Connected');
})

module.exports.sendData = (event, message) => {
    io.sockets.emit(event, message);
}

module.exports.batch1 = batch1;
module.exports.batch2 = batch2;
module.exports.batch3 = batch3;
module.exports.batch4 = batch4;
module.exports.batch5 = batch5;
module.exports.batch6 = batch6;



