const http = require('http');

const PUERTO = 8080;

// Imprimir info de la solicitud
function print_info_req(req) {
    console.log('');
    console.log('Mensaje de solicitud:');
    console.log('=====================');
    console.log('Método: ' + req.method);
    console.log('Recurso: ' + req.url);
    console.log('Version: ' + req.httpVersion);
    console.log('Cabeceras: ');

    // Imprimir cabeceras recorriendolas todas
    for (hname in req.headers) 
        console.log(`  * ${hname}: ${req.headers[hname]}`);
    
    // Construir URL con la de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log('URL completa: ' + myURL.href);
    console.log('  Ruta: ' + myURL.pathname);
}

// Servidor: bucle principal
const server = http.createServer((req, res) => {
    // Petición recibida
    // Imprimir la info
    print_info_req(req);

    // Imprimir datos del cuerpo si hay
    req.on('data', (cuerpo) => {

        // Son caracteres
        req.setEncoding('utf8');

        console.log('Cuerpo: ');
        console.log(`  * Tamaño: ${cuerpo.length} bytes`);
        console.log(`  * Contenido: ${cuerpo}`);
    });

    // Cuando llega el final de la solicitud
    req.on('end', () => {
        console.log('Fin del mensaje');

        // Respuesta de Happy Server
        res.setHeader('Content-Type', 'text/plain');
        res.write('Soy el Happy Server\n');
        res.end();
    });
});

server.listen(PUERTO);

console.log('Happy Server listo! Escuchando en puerto: ' + PUERTO);