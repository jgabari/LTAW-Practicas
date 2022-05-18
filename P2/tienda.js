const http = require('http');
const fs = require('fs');
const inspector = require('inspector');

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

const FICHERO_JSON = 'tienda.json';
let tienda_json = fs.readFileSync(FICHERO_JSON);
let tienda = JSON.parse(tienda_json);

// const BIENVENIDA = fs.readFileSync('bienvenida.html', 'utf-8');
// const LOGIN_ERROR = fs.readFileSync('login_error.html', 'utf-8');

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
    let nickname = '';
    let direccion = '';
    let tarjeta = '';
    let nuevo_pedido = {};
    if (url.pathname=='/') {
        fichero = 'index.html';
    } else if (url.pathname=='/favicon.ico') {
        fichero = 'icono.png';
    } else if (url.pathname=='/productos') {
        fichero = 'tienda.json';
    } else if (url.pathname == '/login') {
        nickname = url.searchParams.get('nick');
        console.log("Login: " + nickname);
        found = false;
        for (i = 0; i < tienda.usuarios.length; i++) {
            if (tienda.usuarios[i].nickname == nickname) {
                found = true;
            }
        }
        if (found == true) {
            res.setHeader('Set-Cookie', "user="+nickname);
            fichero = 'bienvenida.html';
        } else {
            fichero = 'login_error.html';
        }
    } else if (url.pathname == '/finalizar') {
        fichero = 'compra_realizada.html';
        direccion = url.searchParams.get('direccion');
        tarjeta = url.searchParams.get('tarjeta');
        nuevo_pedido = {"nickname": "","direccion":direccion,"tarjeta":tarjeta,"producto":""};
        tienda['pedidos'].push(nuevo_pedido);
        tienda_json = JSON.stringify(tienda);
        fs.writeFileSync(FICHERO_JSON, tienda_json);
    } else if (url.pathname == '/login.html') {
        fichero = 'login.html';
        const cookie = req.headers.cookie;
        if (cookie) {
            const cookie_name = cookie.split('=')[0];
            const cookie_value = cookie.split('=')[1];
            if (cookie_name == 'user'){
                nickname = cookie_value;
                fichero = 'yalogeado.html';
            }
        }
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
            } else if (extension == 'json') {
                res.setHeader('Content-Type', 'application/json');
            }
            page = data;
            if (fichero == 'bienvenida.html' || fichero == 'login_error.html' || fichero == 'yalogeado.html') {
                page = page.toString().replace("USUARIO", nickname);
            }
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