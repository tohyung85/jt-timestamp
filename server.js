'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var port = 3000;
var dbUrl = 'mongodb://heroku_0scnvt0k:kfhhiodtcl8pa77l9nau9b5c1v@ds055535.mongolab.com:55535/heroku_0scnvt0k';

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

