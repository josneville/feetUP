var UserModel = require('../models/user');
module.exports = function(app, gateway){

	app.post("/api/has_account", function (req, res){
		UserModel.find(req.body.fb_id, function (err, user){
			if(err)
				res.send(err);
			if(user.braintree_token)
				res.send(200);
			else
				res.send(400);
		});
	});

	// does a transaction based on customer id
	app.post("/api/do_transaction", function (req, res) {

		var bt_token = "";
		UserModel.findById(req.body.fb_id, function (err, user){
			if(err)
				res.send(err);
			bt_token = user.braintree_token;
			res.send(200);
		});

		var card;
		gateway.creditCard.find(bt_token, function (err, creditCard){
			if(err)
				res.send(err);
			card = creditCard.default;
			res.send(200);
		});

	  var saleRequest = {
	    amount : req.body.amount,
	    creditCard : card,
	    options : {
	      submitForSettlement: true
	    }
	  };

	  gateway.transaction.sale(saleRequest, function (err, result) {
	    if (result.success) {
	      res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
	    } else {
	      res.send("<h1>Error:  " + result.message + "</h1>");
	    }
	  });
	});

	// creates a user with payment info on braintree payment portal and stores it
	app.post("/api/create_user", function (req, res) {
		console.log(req.body);
	  var customerRequest = {
	    firstName: req.body.first_name,
	    lastName: req.body.last_name,
	    creditCard: {
	      number: req.body.number,
	      cvv: req.body.cvv,
	      expirationMonth: req.body.month,
	      expirationYear: req.body.year,
	      billingAddress: {
	        postalCode: req.body.postal_code
	      }
	    }
	  };

	  gateway.customer.create(customerRequest, function (err, result) {
	    if (result.success) {
	      //store the customer id
	      var user = new UserModel({
	      	facebook_token : req.body.id,
	      	braintree_token : result.customer.id
	      });
	      user.save(function(err){
	      		if(err)
	      			res.send(err);
	      		res.send("<h1>Customer created with name: " + result.customer.firstName + " " + result.customer.lastName + "</h1>");
	      });
	    } else {
	      res.send("<h1>Error: " + result.message + "</h1>");
	    }
	  });
	});
};