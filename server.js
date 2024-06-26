const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const storage = require('./storage');

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/handle-username.html');
});

app.get('/setusername', (req, res) => {
    res.sendFile(__dirname + '/setusername.html');
});

app.get('/usename', (req, res) => {
    res.sendFile(__dirname + '/usename.html');
});

app.get('/messages', (req, res) => {
    res.sendFile(__dirname + '/messages.html');
});

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/node_modules/socket.io/client-dist/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js')
});

io.on('connection', (socket) => {
    console.log('user connected');
    // send past messages from MongoDB to the user on request
    socket.on('get past messages', async (name) => {
        const pastMessages = await storage.messages.get();
        pastMessages.forEach(msg => {
            io.emit(`sending past messages to ${name}`, {
                name: msg.name,
                content: msg.content
            });
        })
        io.emit(`sent all messages to ${name}`);
    });

    // Emit messages to the clients when a message is recieved
    socket.on('chat message', (msg) => {
        storage.messages.add(msg);
        io.emit('chat message', {
            name: msg.name,
            content: msg.content
        });
    });
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});