// Cargar el modulo electron
const electron = require('electron');

console.log("Arrancando electron...");

// Punto de entrada
electron.app.on('ready', () => {
    console.log("Evento Ready!");
})