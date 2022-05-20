const WebSocketServer = require('websocket').server;
const http = require('http');
const colors = require('colors');
const express = require('express');

const PUERTO = 8080;

// Aplicación web vacía
const app = express();

// Asociar el servidor http con la app
const server = http.Server(app);

// Servidor de websockets asociado al servidor http
const wsServer = new WebSocketServer({httpServer: server});

// Conexión al websocket
wsServer.on('request', (req) => {
    console.log("Conexión establecida".yellow);

    // Esperar mensajes
    const connection = req.accept();

    // Retrollamada de mensaje recibido
    connection.on('message', (message) => {
        console.log("MENSAJE RECIBIDO");
        console.log("Tipo de mensaje: " + message.type);
        if (message.type === 'utf8') {
            console.log("  Mensaje: " + message.utf8Data.green);

            // Enviar el eco
            connection.sendUTF(message.utf8Data);
        }
    })

    // Retrollamada de cierre de conexión
    connection.on('close', (reasonCode, description) => {
        console.log("Conexión cerrada".yellow + ". Código: " + reasonCode + ". Razon: " + description);
    })
})

// Páginas web express
// Punto de entrada principal
app.get('/', function(req, res) {
    res.send('Bienvenido a mi aplicación web!!!' + '<p><a href="/test.html"></p>');
})

// El directorio publico tiene ficheros estaticos
app.use(express.static('public'));

// Lanzar el servidor
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);