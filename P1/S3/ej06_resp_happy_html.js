const http = require('http');

const PUERTO = 8080;

// texto en html
const pagina = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Happy Server!</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: yellow">HAPPY SERVER!!!</h1>
</body>
</html>
`

// Bucle servidor
const server = http.createServer((req, res) => {

    console.log("Petición recibida.");

    res.statusCode = 200;
    res.statusMessage = "OK";
    res.setHeader('Content-Type', 'text/html');
    res.write(pagina);
    res.end();
});

// Activar el servidor
server.listen(PUERTO);
console.log("Servidor activado. Escuchando en puerto: " + PUERTO);