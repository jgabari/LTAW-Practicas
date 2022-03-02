const http = require('http');

// Crear el servidor
const server = http.createServer();

// Cada vez que llega una petición
function atender(req, res) {
    // req: solicitud
    // res: respuesta

    console.log("Petición recibida.");

    // De momento sin respuesta
}

// Activar función de retrollamada
server.on('request', atender);

// Activar el servidor
server.listen(8080);