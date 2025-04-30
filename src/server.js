const express = require('express');
const http = require('http');
const { initChat } = require('./sockets/chat');

const app = express();
const server = http.createServer(app);

// Initialize chat with socket.io
initChat(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});