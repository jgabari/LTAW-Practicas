const http = require('http');

const PUERTO = 8080;

// Servidor bucle principal
const server = http.createServer((req, res) => {

    console.log('\nMENSAJE 1');

    req.on('data', (cuerpo) => {
        console.log('MENSAJE 2');
    });

    req.on('end', () => {
        console.log('MENSAJE 3');

        // Respuesta de Happy Server
        res.setHeader('Content-Type', 'text/plain');
        res.write('Soy el Happy Server\n');
        res.end();
    });

    console.log('MENSAJE 4');
});

console.log('MENSAJE 5');
server.listen(PUERTO);
console.log('MENSAJE 6');