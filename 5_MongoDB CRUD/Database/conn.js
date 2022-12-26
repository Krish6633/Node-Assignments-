const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");

const conn = async function() {

    let link = await client.connect();
    let db = link.db('user');
    let colle = db.collection('details');
    return colle;
}

module.exports = conn;