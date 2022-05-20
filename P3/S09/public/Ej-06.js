const button = document.getElementById('button');
const display = document.getElementById('display');

// Crear el websocket
const websocket = new WebSocket('ws://localhost:8080');

let cont = 1;

// Mensaje inicial al establecer conexión
websocket.onopen = () => {
    console.log('Conexion establecida!');

    // Mensaje inicial
    websocket.send('Mensaje inicial del cliente!!!');
}

websocket.onclose = () => {
    console.log('Conexion cerrada!');
}

// Mensaje recibido
websocket.onmessage = (e) => {
    display.innerHTML += '<p style="color: blue">' + e.data + '</p>';
}

// Al apretar el botón se envía un mensaje al servidor
button.onclick = () => {
    websocket.send("Hey k pasa-" + cont);
    cont += 1;
}