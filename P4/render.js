const electron = require('electron');
const ip = require('ip');
const qr = require('qrcode');

console.log("Hola desde el proceso de la web...");

// Elementos de la interfaz
const node_v = document.getElementById("node_v");
const chrome_v = document.getElementById("chrome_v");
const electron_v = document.getElementById("electron_v");
const users_n = document.getElementById("users_n");
const client_url = document.getElementById("c_url");
const msgs = document.getElementById("msgs");
const btn_test = document.getElementById("btn_test");
const canvas = document.getElementById("canvas");

// Acceder a la api de node para obtener la info
// Solo se puede si nos han dado permisos desde el main
node_v.textContent = process.versions.node;
chrome_v.textContent = process.versions.chrome;
electron_v.textContent = process.versions.electron;

// Informacion de los ususarios enviada por el main
electron.ipcRenderer.on('users', (event, message) => {
    users_n.textContent = message;
})

// Varible donde vamos a guardar el puerto que nos dirá el main
let puerto;

// Informacion del puerto enviada por el main
electron.ipcRenderer.on('port', (event, message) => {
    puerto = message;
    // Cadena para construir la url del cliente
    let c_url = "http://" + ip.address() + ":" + puerto + '/chat.html';
    client_url.textContent = c_url;
    qr.toCanvas(canvas, c_url);
})

btn_test.onclick = () => {
    // Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

// Mensajes que llegan por el main
electron.ipcRenderer.on('message', (event, message) => {
    msgs.innerHTML += '<p>&#62;' + message + '</p>';
})