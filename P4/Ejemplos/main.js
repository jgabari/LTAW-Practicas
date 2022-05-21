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
        width: 1200,
        height: 800,

        // permitir acceso al sistema
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Para quitar el menu
    //win.setMenuBarVisibility(false);

    // Cargar contenido web
    //win.loadURL('https://www.urjc.es/etsit');

    // Cargar html
    win.loadFile("index.html");

    //Cuando la pagina se cargue enviar el mensaje al renderizado
    win.on('ready-to-show', () => {
        console.log("HOLA?");
        win.webContents.send('print', "MENSAJE ENVIADO DESDE EL MAIN");
    })

    // Al recibir los mensajes del boton de test
    electron.ipcMain.handle('test', (event, msg) => {
        console.log("-> Mensaje: " + msg);
    })
})