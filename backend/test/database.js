const assert = require('assert');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'test';


describe('Database', function () {

    it("should connect to the database", function () {
        MongoClient.connect(url, function (err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            assert.equal(null, err);
            client.close();
        });
    });


});
