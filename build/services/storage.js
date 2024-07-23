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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
class StorageService {
    constructor({ configService = config_1.Config } = {}) {
        this.configService = configService;
    }
    start(args = {}) {
        return new Promise((resolve, reject) => {
            let options = Object.assign({}, this.configService.get(), args);
            let { dbUrl, dbHost, dbPort, dbName } = options;
            console.log(dbUrl);
            let attemptConnect = () => __awaiter(this, void 0, void 0, function* () {
                return mongodb_1.MongoClient.connect(dbUrl);
            });
            let attemptConnectId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.client = yield attemptConnect();
                    this.db = this.client.db(dbName);
                    this.messages = new Messages(this.db);
                    this.users = new Users(this.db);
                    clearInterval(attemptConnectId);
                    resolve(this.client);
                }
                catch (err) {
                    clearInterval(attemptConnectId);
                    reject(new Error(`Failed to connect to database\n${err}`));
                }
            }), 2000);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.close();
            }
        });
    }
}
/**
 * Class for manipulating and reading the message data
 */
class Messages {
    constructor(db) {
        this.collection = db.collection('messages');
    }
    /**
     * Add a message with a name and content to the messages database
     *
     * @param {Object} param
     * @param {String} param.name
     * @param {String} param.content
     * {
     *   name: 'james',
     *   content: 'hello'
     * }
     */
    add(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, content }) {
            yield this.collection.insertOne({ name, content });
        });
    }
    /**
     *
     * @returns json data of the database
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const cursor = yield this.collection.find();
            const messageJson = Array();
            try {
                for (var _d = true, cursor_1 = __asyncValues(cursor), cursor_1_1; cursor_1_1 = yield cursor_1.next(), _a = cursor_1_1.done, !_a; _d = true) {
                    _c = cursor_1_1.value;
                    _d = false;
                    const m = _c;
                    messageJson.push({
                        name: m.name,
                        content: m.content
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = cursor_1.return)) yield _b.call(cursor_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return messageJson;
        });
    }
}
/**
 * Class for manipulating and reading user data
 */
class Users {
    constructor(db) {
        this.collection = db.collection('users');
    }
    /**
     * Adds a name to the users database
     *
     * @param {*} name
     */
    add(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.insertOne({ name: name });
        });
    }
    /**
     * Returns a list of users
     *
     * @returns List of users
     */
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, e_2, _b, _c;
            const cursor = yield this.collection.find();
            const userJson = Array();
            try {
                for (var _d = true, cursor_2 = __asyncValues(cursor), cursor_2_1; cursor_2_1 = yield cursor_2.next(), _a = cursor_2_1.done, !_a; _d = true) {
                    _c = cursor_2_1.value;
                    _d = false;
                    const m = _c;
                    userJson.push({ name: m.name });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = cursor_2.return)) yield _b.call(cursor_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return userJson;
        });
    }
}
exports.Storage = new StorageService();
