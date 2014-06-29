// var UserModel = require('../models/user');
// module.exports = function(app, gateway){

// 	// route to show payment form
// 	app.get("/api/pay", function (req, res) {
// 	  res.render("braintree.ejs");
// 	});

// 	// does a transaction based on customer id
// 	app.post("/create_transaction", function (req, res) {
// 	  var saleRequest = {
// 	    amount: req.body.amount,
// 	    ////////========== do brain tree token here
// 	    options: {
// 	      submitForSettlement: true
// 	    }
// 	  };

// 	  gateway.transaction.sale(saleRequest, function (err, result) {
// 	    if (result.success) {
// 	      res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
// 	    } else {
// 	      res.send("<h1>Error:  " + result.message + "</h1>");
// 	    }
// 	  });
// 	});

// 	// creates a user with payment info
// 	app.post("/create_customer", function (req, res) {
// 	  var customerRequest = {
// 	    firstName: req.body.first_name,
// 	    lastName: req.body.last_name,
// 	    creditCard: {
// 	      number: req.body.number,
// 	      cvv: req.body.cvv,
// 	      expirationMonth: req.body.month,
// 	      expirationYear: req.body.year,
// 	      billingAddress: {
// 	        postalCode: req.body.postal_code
// 	      }
// 	    }
// 	  };

// 	  gateway.customer.create(customerRequest, function (err, result) {
// 	    if (result.success) {
// 	      //store the customer id
// 	      var user = new UserModel({
// 	      	braintree_token : result.customer.id
// 	      });
// 	      user.save(function(err){
// 	      		if(err)
// 	      			res.send(err);
// 	      		res.send("<h1>Customer created with name: " + result.customer.firstName + " " + result.customer.lastName + "</h1>");
// 	      });
// 	    } else {
// 	      res.send("<h1>Error: " + result.message + "</h1>");
// 	    }
// 	  });
// 	});
// };