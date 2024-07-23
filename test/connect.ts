const { MongoClient } = require('mongodb');

const uri = 'mongodb://192.168.1.227:27017/localchat';
const client = new MongoClient(uri);

async function run() {
  console.log(`Attempting to connect to ${uri}`);
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('localchat');
    const collection = db.collection('messages');
    const result = await collection.findOne({});
    console.log('Found document:', result);
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
