const electron = require('electron');
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

let win = null;

const PUERTO = 8080;

const LISTA_COMANDOS = `
<ul style="color:red">
<li>&#47;help -&#62; lista de comandos.</li>
<li>&#47;list -&#62; numero de usuarios conectados.</li>
<li>&#47;hello -&#62; saludo del servidor.</li>
<li>&#47;date -&#62; fecha.</li>
</ul>
`;

let contador = 0;

const app = express();

const server = http.Server(app);

const io = socket(server);

app.use('/', express.static(__dirname + '/'));

electron.app.on('ready', () => {
    win = new electron.BrowserWindow({
        width: 600,
        height: 600,
        // permitir acceso al sistema
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile("index.html");
    win.on('ready-to-show', () => {
        win.webContents.send('port', PUERTO);
    })
});

io.on('connect', (socket) => {
    console.log('**NUEVA CONEXION**'.yellow);
    contador += 1;
    win.webContents.send('users', contador);
    io.emit('server_msg', 'Nuevo participante');
    socket.emit('server_msg', 'Bienvenido/a al MINI-CHAT!');
    socket.on('disconnect', function(){
        console.log('**CONEXION TERMINADA**'.yellow);
        contador -= 1;
        win.webContents.send('users', contador);
    })
    socket.on('message', (msg) => {
        console.log('Mensaje recibido: ' + msg.blue);
        io.send(msg);
        win.webContents.send('message', msg);
    })
    socket.on('help', () => {
        socket.emit('server_msg', LISTA_COMANDOS);
    })
    socket.on('list', () => {
        socket.emit('server_msg', contador + ' usuarios conectados.');
    })
    socket.on('hello', () => {
        socket.emit('server_msg', 'Hola! Que tal?');
    })
    socket.on('date', () => {
        socket.emit('server_msg', Date());
    })
    // Al recibir los mensajes del boton de test
    electron.ipcMain.handle('test', (event, msg) => {
        io.emit('server_msg', msg);
    })
})

server.listen(PUERTO);
console.log('Escuchando en puerto: ' + PUERTO);