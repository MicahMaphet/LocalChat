const http = require('http');
const url = require('url');
const fs = require('fs');
const bot = require('./bot');

const PORT = 8080;

http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var page = q.pathname
    console.log(page);
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
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (page == "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) throw err;
            console.log("index.html");
            res.write(data);
            res.end()
        });
    } else if (page == "/chat") {
        fs.readFile("chat.html", (err, data) => {
            if (err) throw err;
            console.log("chat.html");
            res.write(data);
        });
    } else if (page == "/bot") {
        fs.readFile("bot.html", (err, data) => {
            if (err) throw err;
            console.log("bot.html");
            res.write(data);
        });
    } else res.end(`404 page ${page} could not be found`);
}).listen(PORT);

console.log(`Listening on port ${PORT}`);