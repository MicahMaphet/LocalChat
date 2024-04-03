const http = require('http');
const bot = require('./bot');

const PORT = 8080;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(`Local Chat ${req.url}\n`);
    res.write(bot.phrases.Greating);
    res.end();
}).listen(PORT);

console.log(`Listening on port ${PORT}`);