const http = require('http');

const PUERTO = 8080;

// Bucle servidor
const server = http.createServer((req, res) => {

    console.log("Petición recibida.");

    res.statusCode = 200;
    res.statusMessage = 'OK :P';
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el Happy Server!\n");
    res.end();
});

// Activar el servidor
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto: " + PUERTO);