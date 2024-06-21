const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function add(text) {
    try {
        const database = client.db('localchat');
        const messages = database.collection('messages');

        await messages.insertOne({ message: text });
    } finally {
        client.close();
    }
}

module.exports = { add };