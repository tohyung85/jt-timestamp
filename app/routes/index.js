'use strict';

var DateHandler = require(process.cwd() + '/app/controllers/dateHandler.server.js');

module.exports = function(app, db) {

	var dateHandler = new DateHandler(db);

	app.route('/')
	.get(function (req, res){
		res.sendFile(process.cwd() + '/public/index.html');
	});

	app.route('/:timestamp')
	.get(dateHandler.getDate);
};