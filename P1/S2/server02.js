const http = require('http');

// Puerto que vamos a utilizar
const PUERTO = 8080;

// Cada vez que llega una petición
function atender(req, res) {
    // req: solicitud
    // res: respuesta

    console.log("Petición recibida.");

    // De momento sin respuesta
}

// Crear el servidor con la funcion de retrollamada como argumento.
const server = http.createServer(atender);

// Activar el servidor
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto: " + PUERTO);