const socket = io('http://localhost:3000')
const chatbox = document.getElementById('chat-box')
const msgForm = document.getElementById('send-box')
const msgInp = document.getElementById('msg-input')

const name = prompt('Enter your username:')
addMsg('You joined')

socket.emit('new-user', name);

socket.on('chat-msg', data => {
    addMsg(`${data.name}: ${data.msg}`);
});

socket.on('user-connected', name => {
    addMsg(`${name} connected`);
});

socket.on('user-disconnected', name => {
    console.log('user disconnected')
    addMsg(`${name} disconnected`);
    console.log('user disconnceted')
})

msgForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = msgInp.value;
    addMsg(`You: ${msg}`);
    socket.emit('send-chat-msg', msg);
    msgInp.value = '';
})

function addMsg(msg) {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = msg;
    chatbox.append(msgElement);

}