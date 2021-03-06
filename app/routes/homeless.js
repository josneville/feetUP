var HomelessModel = require('../models/homeless');
var fs = require('fs');

module.exports = function(app){
	
	// get all the homeless people
	app.get('/api/homeless/all', function(req, res){
		HomelessModel.find(null, 'name pictureUrl bio', function(err, homeless){
			if(err)
				res.send(err);
			// homeless returns array json of data
			res.json(homeless); // return all the homeless people as JSON
		});
	});

	//get one homeless person
	app.post('/api/homeless/find', function(req, res){
		//console.log(req.body);
		HomelessModel.findById(req.body.homeless_id, function(err, homeless_person){
			if(err)
				res.send(err);
			res.json(homeless_person); // return the one homeless person as JSON
		});
	});

	//create a new homeless person
	app.post('/api/homeless/create', function(req, res){
		var data = req.body;
		console.log(data);
		var homeless = new HomelessModel(data);
		homeless.save(function(err, person){
			if(err)
				res.send(err);
			res.json(person);
		});
	});

	app.post('/api/homeless/uploadImage', function(req, res){
		var id = req.body.id;
		console.log(id);
		fs.readFile(req.files.file.path, function (err, data) {
			var newPath = req.files.file.path.substring(6);
		    HomelessModel.findByIdAndUpdate(id, {pictureUrl: newPath}, function(err, homeless){
				if(err)
					res.send(err);
				res.json(homeless);
			});
		});
	});

	// update a homeless person
	app.post('/api/homeless/update', function(req, res){
		var data = req.body;
		HomelessModel.findByIdAndUpdate(req.body.homeless_id, data, function(err, homeless){
			if(err)
				res.send(err);
			res.json(homeless);
		});
	});

	// delete a homeless person
	app.post('/api/homeless/delete', function(req, res){

		HomelessModel.remove({ _id : req.body.homeless_id }, function(err, homeless){
			if(err)
				res.send(err);
			res.json(homeless);
		});
	});

	// data for testing purposes
	app.get('/api/test_homeless', function(req, res){

		var supporterArray = [
			{
				id : "first",
				name : "ninja", 
				amount : 1
			},
			{
				id : "second",
				name : "monster", 
				amount : 2
			}	
		];

		var needs = {
			food : 
			{ 
				current : 1,
				total : 2
			},
			shelter : 
			{
				current : 3, 
				total : 4
			},
			clothing : 
			{
				current : 5,
				total : 6
			}
		};

		var goalsArray = [
			{
				title : "get fat",
				description : "I wanna get swole",
				subgoals:
					[
						{
							subgoaltitle : "eat",
							current : 200,
							total : 300
						},
						{
							subgoaltitle : "cookies",
							current : 100,
							total : 500
						}
					]
			},
			{
				title : "get skinny",
				description : "what what",
				subgoals:
					[
						{
							subgoaltitle : "eat less",
							current : 2,
							total : 3
						},
						{
							subgoaltitle : "monkey",
							current : 4,
							total : 8
						}
					]
			}
		];


		var homeless = new HomelessModel({
			name : "Vishal",
			pictureUrl : "http://yo.com",
			bio : "Ma Life",
			supporters : supporterArray,
			dailyNeeds : needs,
			goals : goalsArray
		});
		
		homeless.save(function(err){
			if(err)
				res.send(err);
			res.send('\n' + homeless);
		});
	});
};