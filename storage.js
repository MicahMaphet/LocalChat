const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

/**
 * Class for manipulating and reading the message data
 */
class messages {
    /**
     * Add a message with a name and content to the messages database
     * 
     * @param {*} msg 
     * {
     *   name: 'james',
     *   content: 'hello'
     * }
     */
    static async add(msg) {
        try {
            client.connect();
            const database = client.db('localchat');
            const messagesDB = database.collection('messages');
    
            await messagesDB.insertOne(msg);
        } finally {
            client.close();
        }
    }

    /**
     * 
     * @returns json data of the database
     */
    static async get() {
        try {
            client.connect();
            const database = client.db('localchat');
            const messagesDB = database.collection('messages');

            const cursor = await messagesDB.find();

            var messageJson = [];
            for await (const m of cursor) {
                messageJson.push(
                    { 
                        name: m.name,
                        content: m.content
                    }
                );
            }
            return messageJson;
        } finally {
            await client.close();
        }
    }
}

/**
 * Class for manipulating and reading user data
 */
class users {
    /**
     * Adds a name to the users database
     * 
     * @param {*} name
     */
    static async add(name) {
        try {
            client.connect();
            const database = client.db('localchat');
            const usersDB = database.collection('users');
    
            await usersDB.insertOne({ name: name });
        } finally {
            await client.close();
        }
    }

    /**
     * Returns a list of users
     * 
     * @returns List of users
     */
    static async get() {
        try {
            client.connect();
            const database = client.db('localchat');
            const usersDB = database.collection('users');

            const cursor = await usersDB.find();

            var userJson = [];
            for await(m of cursor) {
                userJson.push({ name: m.name });
            }

            return userJson;
        } finally {
            await client.close();
        }
    }
}

module.exports = { messages, users };