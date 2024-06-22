const express = require('express');
const path = require('path');
const database = require('./database.js')

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/handle-username.html');
});

app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/setusername', (req, res) => {
    res.sendFile(__dirname + '/setusername.html');
});

app.get('/usename', (req, res) => {
    res.sendFile(__dirname + '/usename.html');
});

app.listen(port);

app.post('/post/message', async (req, res) => {
    database.add(req.body.message);
});

app.post('/post/setusername', async (req, res) => {
    
});

console.log(`Listening on port ${8080}`);