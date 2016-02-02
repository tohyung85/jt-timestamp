'use strict';

var express = require('express');
var mongo = require('mongodb').MongoClient;
var routes = require('./app/routes/index.js');

var app = express();
var port = 3000;
var dbUrl = 'mongodb://localhost:27017/jt-timestamp';

mongo.connect(dbUrl, function(err, db){
	if (err) {
		throw err;
	} else {
		console.log('successfully connected to MONGODB Port 27017');
	}

	routes(app, db);

/*	app.route('/').get(function(req, res){
		var date = db.collection('date');
		var dateProjection = {'_id': false};
		var today = Math.floor(Date.now()/1000);
		date.findOne({}, dateProjection, function(err, result){
			if (err) {
				throw err;
			}
			if (result) {
				res.json(result);
			} else {
				date.insert({'date': today}, function(err){
					if (err) {
						throw err;
					} 
					date.findOne({}, dateProjection, function(err, doc){
						if (err){
							throw err;
						}
						res.json(doc);
					});
				});
			}
		});
	});
*/
	app.listen(port, function(){
		console.log('Listening to port 3000');
	});
});

