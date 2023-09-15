const express = require('express');
const cors = require('cors');
const { Client } = require("@notionhq/client")

const app = express();
const routes = require('./router');


app.use(cors());

let dependencyContainer = {}
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})
dependencyContainer.notion = notion;

app.use((req, res, next) => {
    req.dependencyContainer = dependencyContainer;
    next();
});

routes.forEach((route) => {
    if (route.method && route.path && route.handler) {
        console.log(`Adding route: ${route.method} ${route.path}`);
        // DOC route: path, method, scope, handler
        if (route.scope == 'public') { // for now we use this (no internal yet)
            app[route.method.toLowerCase()](route.path, route.handler);
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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
