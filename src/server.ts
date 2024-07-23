import express, { Express, Request, Response } from "express";
import { Server } from 'socket.io';
import { Storage } from "./services/storage";
import path from "path";

const app: Express = express();
const port = 3000;
const io = new Server();

__dirname = path.join(__dirname, '../..');

app.get('/', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/handle-username.html');
});

app.get('/setusername', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/setusername.html');
});

app.get('/usename', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/usename.html');
});

app.get('/messages', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/messages.html');
});

app.get('/index.js', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.js');
});

app.get('/node_modules/socket.io/client-dist/socket.io.js', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js')
});


io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('get past messages', async (name) => {
        const pastMessages = await Storage.messages?.get();
        pastMessages?.forEach(msg => {
            io.emit(`sending past messages to ${name}`, {
                name: msg.name,
                content: msg.content
            });
        })

        io.emit(`sent all messages to ${name}`);
    });

    socket.on('chat message', (msg) => {
        Storage.messages?.add(msg);
        io.emit('chat message', {
            name: msg.name,
            content: msg.content
        });
    });
});

process.on('SIGINT', Storage.stop);

Storage.start()
    .then(() => {   
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch(console.error);