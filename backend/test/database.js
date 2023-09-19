const assert = require('assert');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL;
const dbName = 'test';
const client = new MongoClient(url, {
});


describe('Database', function () {

    it("should connect to the database", async function () {
        // give mongo some time to start up
        this.timeout(10000);
        await client.connect();
        const db = client.db(dbName);
        await db.command({ ping: 1 }, function (err, res) {
            assert.equal(null, err);
            assert.equal(1, res.ok);
            console.log("Pong");
        });
        client.close();
    });

    it("should insert a document into the database", async function () {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('documents');
        let res = await collection.insertOne({ a: 1 }).catch(err => console.log(err));
        assert.equal(true, res.acknowledged);
        await client.close();
    });



});
