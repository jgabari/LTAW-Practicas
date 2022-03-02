const http = require('http');

// Puerto que vamos a utilizar
const PUERTO = 8080;

// Crear el servidor definiendo la funcion de retrollamada dentro de los argumentos
const server = http.createServer((req, res) => {

    console.log("Petición recibida.");

    // De momento sin respuesta
});

// Activar el servidor
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto: " + PUERTO);