const http = require('http');
const url = require('url');
const bot = require('./bot');

const PORT = 8080;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Local Chat\n`);
    var q = url.parse(req.url, true).query;
    var txt = q.month + " " + q.day + "\n";
    res.write(txt);
    res.write(bot.phrases.Greating);
    res.end();
}).listen(PORT);

console.log(`Listening on port ${PORT}`);