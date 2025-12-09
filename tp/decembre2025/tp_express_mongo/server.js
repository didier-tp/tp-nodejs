//var express = require('express');
import express from 'express';

//var produitApiRoutes = require('./produit-api-routes');
//import produitApiRoutes from './produit-api-routes-memory.js';
import produitApiRoutes from './produit-api-routes.js'; //version avec mongodb

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

var app = express();

//support parsing of JSON post data
var jsonParser = express.json({ extended: true });
app.use(jsonParser);

//les routes en /html/... seront gérées par express
//par de simples renvois des fichiers statiques du répertoire "./html"
app.use('/html', express.static(__dirname + "/html"));
app.get('/', function (req, res) {
    res.redirect('/html/index.html');
});

/*
//basic middleware for checking apiKey:
app.use(function (req, res, next) {
    let apiKey = req.query.apiKey;
    if (apiKey == null) {
        res.status(400).send({ err: "apiKey missing in request", example: "?apiKey=abc123" })
        //...
        //plus other code for checkin apiKey in database ...
    } else next();
});
*/

//delegate REST API routes to apiRouter(s) :
app.use(produitApiRoutes.apiRouter);
//app.use(otherApiRoutes.apiRouter);

app.listen(8282, function () {
    console.log("http://localhost:8282");
});