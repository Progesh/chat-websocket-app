const socketIO = require('socket.io');

let users = {};

const initChat = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        // Register a new user
        socket.on('register', (username) => {
            users[socket.id] = username;
            socket.broadcast.emit('userConnected', username);
        });

        // Handle sending messages
        socket.on('sendMessage', (message) => {
            const username = users[socket.id];
            io.emit('receiveMessage', { username, message });
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            const username = users[socket.id];
            delete users[socket.id];
            socket.broadcast.emit('userDisconnected', username);
            console.log('User disconnected: ' + socket.id);
        });
    });
};

module.exports = { initChat };