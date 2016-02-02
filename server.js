'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var port = 3000;
var dbUrl = 'mongodb://heroku_ll42fnqj:ffqjc4h0rsk9o07hcvthdhb05p@ds055515.mongolab.com:55515/heroku_ll42fnqj';

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

