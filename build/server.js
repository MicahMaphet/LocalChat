"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const storage_1 = require("./services/storage");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const io = new socket_io_1.Server();
__dirname = path_1.default.join(__dirname, '..');
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
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('get past messages', (name) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const pastMessages = yield ((_a = storage_1.Storage.messages) === null || _a === void 0 ? void 0 : _a.get());
        pastMessages === null || pastMessages === void 0 ? void 0 : pastMessages.forEach(msg => {
            io.emit(`sending past messages to ${name}`, {
                name: msg.name,
                content: msg.content
            });
        });
        io.emit(`sent all messages to ${name}`);
    }));
    socket.on('chat message', (msg) => {
        var _a;
        (_a = storage_1.Storage.messages) === null || _a === void 0 ? void 0 : _a.add(msg);
        io.emit('chat message', {
            name: msg.name,
            content: msg.content
        });
    });
});
process.on('SIGINT', storage_1.Storage.stop);
storage_1.Storage.start()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch(console.error);
