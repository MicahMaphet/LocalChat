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

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/node_modules/socket.io/client-dist/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js')
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

app.get('/json/messages', async (req, res) => {
    res.end(JSON.stringify(await storage.messages.get()));
});

app.post('/post/message', async (req, res) => {
    console.log(req.body);
    storage.messages.add(req.body.message);
});

app.post('/post/setusername', async (req, res) => {
    storage.users.add(req.body.name);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});