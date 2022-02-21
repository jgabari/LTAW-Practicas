//-- El fichero de mi tienda

//-- * Fichero .html
//-- * Ficheros de imagenes .jpg .png
//-- * Ficheros .css
//-- Devolver el fichero pedido
//-- Si no se localiza MENSAJE DE ERROR

//-- CREAR UN SERVIDOR
//-- Se llama a la funcion de retrollamada cada vez que hay una peticion

//-- Localizar el recurso que nos piden+
//-- (Sacarlo por la consola)
//-- OBTENER el nombre del fichero

//-- LECTURA ASINCRONA del fichero
//  -- Funcion de retrollamada de lectura
//  -- Imprimir en la consola el nombre del fichero que estoy leyendo
//  -- Si hay error generar la pagina html de error (en una constante, no hace falta fichero)
//  -- Si no hay error
//    -- Devolver el contenido como respuesta
//    -- La respuesta depende del tipo de fichero
//      -- HTML: Cabecera: 'Content-Type', 'text-html'
//      -- IMAGEN: 'image/jpg', 'image/png'
//      -- CSS: 'text/css'

//      -- Para saber el tipo del fichero:
//        -- por la extension sacandola del nombre
//------------------------------------------------------------------------------------------------------------------------------------------------
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

    console.log("Petición recibida!");
    
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log('RECURSO PEDIDO: ' + url.pathname);
    fichero = url.pathname.slice(1);
    console.log("FICHERO QUE SE BUSCA: " + fichero);

    fs.readFile(fichero, (err, data) => {

        if (err) {
            console.log("Error!");
            console.log(err.message);
            code = 404;
            code_msg = "Not Found";
            res.setHeader('Content-Type', 'text/html');
            page = pagina_error;
        }
        else {
            console.log("Fichero encontrado!");
            punto = fichero.indexOf('.');
            extension = fichero.slice(punto + 1);
            code = 200;
            code_msg = "OK"
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
    })

    res.statusCode = code;
    res.statusMessage = code_msg;
    res.write(page);
    res.end();
    console.log("Respuesta enviada!");
});

server.listen(9090);