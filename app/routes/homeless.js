var HomelessModel = require('../models/homeless');
module.exports = function(app){
	
	// get all the homeless people
	app.get('/api/homeless', function(req, res){
		HomelessModel.find(function(err, homeless){
			if(err)
				res.send(err);
			res.json(homeless); // return all the homeless people as JSON
		});
	});

	//get one homeless person
	app.post('/api/homeless/', function(req, res){
		//console.log(req.body);
		HomelessModel.findById(req.body.homeless_id, function(err, homeless_person){
			if(err)
				res.send(err);
			res.json(homeless_person); // return the one homeless person as JSON
		});
	});


};