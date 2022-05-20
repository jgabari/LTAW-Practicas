const W3CWebSocket = require('websocket').w3cwebsocket;
const colors = require('colors');

// Crear el objeto cliente con la url a la que conectarse
const client = new W3CWebSocket('ws://localhost:8080/');

// Función de llamada al estblecer conexión
client.onopen = () => {
    console.log('CLIENTE. Conectado al Servidor'.yellow);

    const MSG = "Hey que pasaaa-";
    let cont = 1;

    // Enviar mensaje inicial
    client.send("Mensaje inicial");

    // Enviar mensajes cada 2 segundos
    setInterval(() => {
        //Solo si la conexión está abierta
        if (client.readyState == client.OPEN) {
            console.log("Enviado: " + (MSG + cont).blue);
            client.send(MSG + cont);
            cont = cont + 1;
        }
    }, 2000);
}

// Retrollamada de mensaje recibido
client.onmessage = (e) => {
    // Solo imprimir los mensajes de texto
    if (typeof e.data === 'string') {
        console.log("Mensaje recibido: " + e.data.green);
    }
}

// Retrollamada de conexión terminada
client.onclose = () => {
    console.log('CLIENTE: Conexión terminada'.yellow);
}