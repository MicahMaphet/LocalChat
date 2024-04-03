const http = require('http');
const url = require('url');
const fs = require('fs');
const bot = require('./bot');

const PORT = 8080;

http.createServer((req, res) => {
    fs.readFile('index.html', function(err, data) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(PORT);

console.log(`Listening on port ${PORT}`);