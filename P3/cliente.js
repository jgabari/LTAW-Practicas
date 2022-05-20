const display = document.getElementById('display');
const msg_entry = document.getElementById('msg_entry');

const socket = io();

socket.on('message', (msg) => {
    display.innerHTML += '<p>&#62;' + msg + '</p>';
})

socket.on('server_msg', (msg) => {
    display.innerHTML += '<p style="color:red">&#62;&#62;Server: ' + msg + '</p>';
})

msg_entry.onchange = () => {
    if (msg_entry.value) {
        if (msg_entry.value[0] == '/') {
            let command = msg_entry.value.slice(1);
            socket.emit(command);
        } else {
            socket.send(msg_entry.value);
        }
        msg_entry.value = '';
    }
}