const assert = require('assert');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL;
const dbName = 'test';
const client = new MongoClient(url, {
    useUnifiedTopology: true,
});


describe('Database', function () {

    before(async function () {
        // give mongo some time to start up
        this.timeout(10000);
        try {
            await client.connect();
        } catch (err) {
            console.log(err);
        }
        console.log("Connected successfully to server");
    });

    after(async function () {
        await client.close();
    });


    it("should connect to the database", async function () {
        // give mongo some time to start up
        const db = client.db(dbName);
        await db.command({ ping: 1 }, function (err, res) {
            assert.equal(null, err);
            assert.equal(1, res.ok);
            console.log("Pong");
        });
    });

    it("should insert a document into the database", async function () {
        const db = client.db(dbName);
        const collection = db.collection('documents');
        let res = await collection.insertOne({ a: 1 }).catch(err => console.log(err));
        assert.equal(true, res.acknowledged);
    });



});
