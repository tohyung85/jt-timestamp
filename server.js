'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var port = 3000;

routes(app);

app.listen(port, function(){
	console.log('Listening to port 3000');
});