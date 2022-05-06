const http = require('http');
const fs = require('fs');

const PUERTO = 9090;

const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body>
    <h1>ERROR</h1>
    <h3>Recurso no encontrado o no compatible<h3>
</body>
</html>
`

const server = http.createServer((req, res) => {

    console.log("_____________________________________________");
    console.log("Petición recibida!");

    //Valores por defecto de la respuesta
    let code = 200;
    let code_msg = 'OK';
    let page = '';
    
    //Construyo la URL que ha solicitado el cliente y extraigo el recurso solicitado
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log('RECURSO PEDIDO: ' + url.pathname);

    //Saco el nombre del fichero que tengo que buscar
    let fichero = '';
    if (url.pathname=='/') {
        fichero = 'index.html';
    } else if (url.pathname=='/favicon.ico') {
        fichero = 'icono.png';
    } else {
        fichero = url.pathname.slice(1);
    }
    console.log("FICHERO QUE SE BUSCA: " + fichero);

    //Lectura asincrona del fichero
    fs.readFile(fichero, (err, data) => {

        if (err) {
            //Si no se encuentra el fichero
            console.log("Error!");
            console.log(err.message);
            code = 404;
            code_msg = "Not Found";
            res.setHeader('Content-Type', 'text/html');
            page = pagina_error;
        } else {
            console.log("Fichero encontrado!");
            //Extraigo la extension del nombre del fichero segun cual sea
            //hago la respuesta que corresponda
            punto = fichero.indexOf('.');
            extension = fichero.slice(punto + 1);
            if (extension == 'html'){
                res.setHeader('Content-Type', 'text/html');
            } else if (extension == 'jpg'){
                res.setHeader('Content-Type', 'image/jpg');
            } else if (extension == 'png') {
                res.setHeader('Content-Type', 'image/png');
            } else if (extension == 'css') {
                res.setHeader('Content-Type', 'text/css');
            }
            page = data;
        }
        //Asigno los valores de la respuesta y la envio
        res.statusCode = code;
        res.statusMessage = code_msg;
        res.write(page);
        res.end();
        console.log("Respuesta enviada!");
    })
});

//Lanzo el servidor
server.listen(9090);
console.log('Servidor escuchando en el puerto ' + PUERTO);