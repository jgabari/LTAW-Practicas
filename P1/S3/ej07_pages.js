const http = require('http');

const PUERTO = 8080;

// HTML pagina principal
const pagina_main = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">MI TIENDA</h1>
</body>
</html>
`

// HTML pagina de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: black">
    <h1 style="color: red">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res) => {
    console.log("Petición recibida!");

    // Respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;

    // URL solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    // Todo lo q no sea la pagina principal genera error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    // Generar respuesta
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type', 'text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);