const http = require('http');
const url = require('url');
const fs = require('fs');
const bot = require('./bot');

const PORT = 8080;

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var page = q.pathname
    console.log(req.url);
    if (req.url == '/favicon.ico') {
        fs.readFile('images/favicon.png', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            res.end(data);
        });
        return;
    }
    
    if (req.url == '/images/bubble.png') {
        fs.readFile('images/bubble.png', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            res.end(data);
        });
        return;
    }

    if (req.url == '/images/bot.png') {
        fs.readFile('images/bot.png', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': 'image/x-icon' });
            res.end(data);
        });
        return;
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    if (req.url == "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end()
        });
    } else if (req.url == "/chat") {
        fs.readFile("chat.html", (err, data) => {
            if (err) throw err;
            res.write(data);
        });
    } else if (req.url == "/bot") {
        fs.readFile("bot.html", (err, data) => {
            if (err) throw err;
            res.write(data);
        });
    } else res.end(`404 page ${page} could not be found`);
}).listen(PORT);

console.log(`Listening on port ${PORT}`);