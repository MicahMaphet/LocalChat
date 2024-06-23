const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function addMessage(text) {
    try {
        const database = client.db('localchat');
        const messages = database.collection('messages');

        await messages.insertOne({ message: text });
    } finally {
        client.close();
    }
}

async function addUser(name) {
    try {
        const database = client.db('localchat');
        const users = database.collection('users');

        await users.insertOne({ name: name });
    } finally {
        client.close();
    }
}

module.exports = { addMessage, addUser };