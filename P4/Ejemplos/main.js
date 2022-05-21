// Cargar el modulo electron
const electron = require('electron');

console.log("Arrancando electron...");

// Variable para acceder a la ventana
let win = null;

// Punto de entrada
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    // Crear la ventana principal
    win = new electron.BrowserWindow({
        width: 600,
        height: 400
    });

    // Para quitar el menu
    win.setMenuBarVisibility(false);
})