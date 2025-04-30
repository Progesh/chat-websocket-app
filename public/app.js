const socket = io();

const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let username;

// Initially hide the messages container
messagesDiv.style.display = 'none';

// Register the user
usernameInput.addEventListener('change', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('register', username);
        usernameInput.disabled = true;
    }
});

// Send a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && username) {
        socket.emit('sendMessage', message);
        messageInput.value = '';
    }
});

// Receive a message
socket.on('receiveMessage', ({ username, message }) => {
    // Show the messages container if it's hidden
    if (messagesDiv.style.display === 'none') {
        messagesDiv.style.display = 'block';
    }

    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Notify when a user connects
socket.on('userConnected', (username) => {
    // Show the messages container if it's hidden
    if (messagesDiv.style.display === 'none') {
        messagesDiv.style.display = 'block';
    }

    const messageElement = document.createElement('div');
    messageElement.textContent = `${username} joined the chat.`;
    messageElement.classList.add('notification');
    messagesDiv.appendChild(messageElement);
});

// Notify when a user disconnects
socket.on('userDisconnected', (username) => {
    // Show the messages container if it's hidden
    if (messagesDiv.style.display === 'none') {
        messagesDiv.style.display = 'block';
    }

    const messageElement = document.createElement('div');
    messageElement.textContent = `${username} left the chat.`;
    messageElement.classList.add('notification');
    messagesDiv.appendChild(messageElement);
});