'use strict';

var DateHandler = function (db) {
	var date = db.collection('date');
	var today = Math.floor(Date.now()/1000);

	this.getDate = function (req, res) {	

		function getDateFormats (dateInput) {
			var unixDate = null;
			var natDate = null;									
			var options = {year:'numeric', month:'long', day:'numeric'};
			if (Number.isInteger(Number(dateInput))) {
				unixDate = dateInput;
				var date = new Date(dateInput * 1000);				
				natDate = date.toLocaleDateString('en-US', options);
			} else {
				var decodedDate = decodeURIComponent(dateInput);
				var date = new Date(decodedDate);
				if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())) {
					natDate = date.toLocaleDateString('en-US', options);
					unixDate = date.getTime() / 1000;
				}
			}
			return {'unix': unixDate, 'natural': natDate};
		}

		var requestedTime = req.params.timestamp;

		var allDates = getDateFormats(requestedTime);

		var dateProjection = {'_id': false};

		date.findOne({}, dateProjection, function(err, result){
			if (err) {
				throw err;
			}
			if (result) {				
				date.findAndModify(
					{},
					{'_id': 1},
					{$set: allDates},
					function (err, result) {
						if(err) {
							throw err;
						}
						date.findOne({}, dateProjection, function(err, doc){
							if (err){
								throw err;
							}
							res.json(doc);
						});
					}
				);
			} else {
				date.insert(allDates, function(err){
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
	}
}

module.exports = DateHandler;