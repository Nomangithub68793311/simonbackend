const express = require('express');
<<<<<<< HEAD
const mongoose = require('mongoose');
const http = require("http")
const socketio = require('socket.io');
const morgan = require('morgan');
const { ExpressPeerServer } = require('peer');
=======
const mongoose = require('mongoose')
>>>>>>> 5ef3a489bd041074623f95d5a536129bbfbdbe29
var cors = require('cors')
const app = express();
const router = require('./routes/authroute');
app.use(cors())
app.use(express.json());
<<<<<<< HEAD
const server = http.createServer(app)
const io = socketio(server).sockets;
const custogenFunc = () =>
    (Math.random().toString(36) + "000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/",
    generateClientId: custogenFunc
})
app.use("/mypeer", peerServer)
io.on('connection', function (socket) {
    console.log('socket connected');
})
// const mongouri='mongodb+srv://userSimon:SimonntHJ3322@cluster0.ckww6.mongodb.net/userData?retryWrites=true&w=majority';
const mongouri = 'mongodb+srv://contact:My9J9xnpsYSRnH6@cluster0.ncmj4.mongodb.net/simonDatabase?retryWrites=true&w=majority'
=======

const mongouri = 'mongodb+srv://userSimon:SimonntHJ3322@cluster0.ckww6.mongodb.net/userData?retryWrites=true&w=majority';
>>>>>>> 5ef3a489bd041074623f95d5a536129bbfbdbe29


mongoose.connect(mongouri, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then((result) => {
    console.log('mongo connected');
})
    .catch((err) => { console.log(err) });
<<<<<<< HEAD
=======
app.get('/', (req, res) => {
    res.send('yes got it now');
>>>>>>> 5ef3a489bd041074623f95d5a536129bbfbdbe29


const port = process.env.PORT || 5000;
<<<<<<< HEAD
server.listen(port, () => { console.log(`server run with ${port}`) })
=======
app.listen(port, () => { console.log(`server run at ${port}`) })
>>>>>>> 5ef3a489bd041074623f95d5a536129bbfbdbe29
app.use(router)