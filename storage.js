const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);


class messages {
    static async add(text) {
        try {
            client.connect();
            const database = client.db('localchat');
            const messagesDB = database.collection('messages');
    
            await messagesDB.insertOne({ message: text });
        } finally {
            client.close();
        }
    }

    static async get() {
        try {
            client.connect();
            const database = client.db('localchat');
            const messagesDB = database.collection('messages');

            const cursor = await messagesDB.find();

            var messageJson = [];
            for await (const m of cursor) {
                messageJson.push(
                    { message: m.message }
                );
            }
            return messageJson;
        } finally {
            await client.close();
        }
    }
}

class users {
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

    static async get() {
        try {
            client.connect();
            const database = client.db('localchat');
            const usersDB = database.collection('users');

            return await usersDB.find();
        } finally {
            await client.close();
        }
    }
}

module.exports = { messages, users };