const express = require('express');
const cors = require('cors');
const { Client } = require("@notionhq/client")
// import mongodb from 'mongodb';
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const routes = require('./router');
require('dotenv').config()

app.use(cors());

let dependencies = {}
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const client = new MongoClient(process.env.MONGO_URL, {
});

async function connectDB(next) {
    console.log('Connecting to database');
    console.time('connectDB');
    await client.connect();
    console.timeEnd('connectDB');
    console.log("Connected successfully to server");
    await client.db("admin").command({ ping: 1 });
    dependencies.mongo = client;
    client.close();
    next();
}


dependencies.notion = notion;
dependencies.ls = [
    'notion',
    'mongo'
]

async function registerRoutes(next) {

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
    next();
}


connectDB(() => {
    registerRoutes(() => {
        console.log('Routes registered');
        const server = app.listen(3000, () => {
            console.log('Example app listening on port 3000!');
        });
    });
});
