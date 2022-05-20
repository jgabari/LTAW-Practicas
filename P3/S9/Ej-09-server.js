const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const exp = require('constants');

const PUERTO = 8080;

const app = express();

const server = http.Server(app);

const io = socket(server);

app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/Ej-09.html">Test</a></p>');
})

app.use('/', express.static(__dirname + '/'));

app.use(express.static('public'));

io.on('connect', (socket) => {
    console.log('**NUEVA CONEXION**'.yellow);
    socket.on('disconnect', function(){
        console.log('**CONEXION TERMINADA**'.yellow);
    })
    socket.on('message', (msg) => {
        console.log('Mensaje recibido: ' + msg.blue);
        io.send(msg);
    })
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);