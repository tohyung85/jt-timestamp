'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var port = process.env.PORT || 8080;
var dbUrl = 'mongodb://localhost:27017/jt-timestamp';

mongo.connect(dbUrl, function(err, db){
	if (err) {
		throw err;
	} else {
		console.log('successfully connected to MONGODB Port 27017');
	}

	routes(app, db);

	app.listen(port, function(){
		console.log('Listening to port' + port);
	});
});

