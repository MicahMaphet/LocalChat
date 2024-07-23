const MongoClient = require('mongodb').MongoClient;


class Storage {
    constructor() {
        // TODO use configurable db params
        const uri = 'mongodb://localhost:27017';
        this.client = new MongoClient(uri);
        this.db = this.client.db('localchat');
    }

    async init() {
        await this.client.connect();
        this.messages = new Messages(this.db);
        this.users = new Users(this.db);
    }

    stop() {
        this.client.close();
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
    async add({ name, content }) {
        console.log(`added ${name} ${content}`)
        await this.collection.insertOne({ name, content });
    }

    /**
     * 
     * @returns json data of the database
     */
    async get() {
        const cursor = await this.collection.find();

        const messageJson = [];
        for await (const m of cursor) {
            messageJson.push(
                { 
                    name: m.name,
                    content: m.content
                }
            );
        }
        return messageJson;
    }
}

/**
 * Class for manipulating and reading user data
 */
class Users {
    constructor(storage) {
        this.collection = storage.collection('users');
    }

    /**
     * Adds a name to the users database
     * 
     * @param {*} name
     */
    async add(name) {
        await this.collection.insertOne({ name: name });
    }

    /**
     * Returns a list of users
     * 
     * @returns List of users
     */
    async get() {
        const cursor = await this.collection.find();

        const userJson = [];
        for await(m of cursor) {
            userJson.push({ name: m.name });
        }

        return userJson;
    }
}

module.exports = new Storage();