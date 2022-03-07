const http = require('http');

const PUERTO = 8080;

// Bucle servidor
const server = http.createServer((req, res) => {

    console.log("Petición recibida.");

    res.statusCode = 404;
    res.statusMessage = 'Not Found >:(';
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el Angry Server!\n");
    res.end();
});

// Activar el servidor
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto: " + PUERTO);