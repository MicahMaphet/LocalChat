const express = require('express');
const path = require('path');
const database = require('./database.js')

const port = 8080;
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/index.js', (req, res) => {
    res.sendFile(__dirname + '/index.js');
});

app.post('/message', async (req, res) => {
    res.send('POST Request Called');
    console.log(req.body.message);
    database.add(req.body.message)
});

app.listen(port);
console.log(`Listening on port ${8080}`);