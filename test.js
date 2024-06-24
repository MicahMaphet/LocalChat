const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('localchat');
        const messages = database.collection('messages');

        const cursor = await messages.find();
        var docs = [];
        for await (const m of cursor) {
            console.dir(m);
            docs.push(m);
        }
    } finally {
        await client.close();
    }
}

run().catch(console.dir);