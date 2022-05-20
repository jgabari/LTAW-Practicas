const display = document.getElementById('display');
const msg_entry = document.getElementById('msg_entry');

const socket = io();

socket.on('message', (msg) => {
    display.innerHTML += '<p style="color:blue">' + msg + '</p>';
})

msg_entry.onchange = () => {
    if (msg_entry.value) {
        socket.send(msg_entry.value);
        msg_entry.value = '';
    }
}