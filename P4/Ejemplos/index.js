const electron = require('electron');

console.log("Hola desde el proceso de la web...");

// Elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");

// Acceder a la api de node para obtener la info
// Solo se puede si nos han dado permisos desde el main
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

btn_test.onclick = () => {
    display.innerHTML += "TEST!";
    console.log("Botón apretado!");

    // Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

// Mensaje recibido del main
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
})