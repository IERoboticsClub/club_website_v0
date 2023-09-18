const express = require('express');
const cors = require('cors');
const { Client } = require("@notionhq/client")
// import mongodb from 'mongodb';
const { MongoClient } = require('mongodb');

const app = express();
const routes = require('./router');
require('dotenv').config()

app.use(cors());

let dependencies = {}
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const mongoClient = MongoClient(process.env.MONGO_URL, () =>{
    console.log("Connected successfully to server");
    const db = mongoClient.db(process.env.MONGO_DB);
    return db;
});

try {
    mongoClient.connect();
    dependencies.mongo = mongoClient
    dependencies.useMongo = (callback) => {
        // make sure we are connected to the database before we do anything
        if (mongoClient.isConnected()) {
            callback(mongoClient);
        }
        else {
            mongoClient.connect(() => {
                callback(mongoClient);
            });
        }
    }

    console.log("DB")
}
catch (err) {
    console.log(err);
}




dependencies.notion = notion;
dependencies.ls = [
    'notion',
    'mongo'
]

console.log('Dependencies:');
console.log(dependencies);

app.use((req, res, next) => {
    req.dependencies = dependencies;
    next();
});

routes.forEach((route) => {
    if (route.method && route.path && route.handler) {
        console.log(`Adding route: ${route.method} ${route.path}`);
        // DOC route: path, method, scope, handler
        if (route.scope == 'public') { // for now we use this (no internal yet)
            // make sure that the body is also passed to the handler
            app[route.method.toLowerCase()](route.path, route.handler).use(express.json()); // for parsing application/json
        } else {
            app[route.method.toLowerCase()](route.path, (req, res, next) => {
                // TODO implement authentication middleware
                // check if the user is authenticated
                // if not, return a 401
                // if so, call next()
                next();
            }, route.handler);
        }
    } else {
        console.log(`Invalid route: ${JSON.stringify(route)}`);
    };
});




const server = app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
