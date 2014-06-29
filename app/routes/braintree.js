module.exports = function(app, gateway){

	// route to show payment form
	app.get("/api/pay", function (req, res) {
  		res.render("braintree.ejs");
	}); 

	// payment form creates transaction via post
	app.post("/create_transaction", function (req, res) {
	  	var saleRequest = {
		    amount: "100.00",
		    creditCard: {
		      number: req.body.number,
		      cvv: req.body.cvv,
		      expirationMonth: req.body.month,
		      expirationYear: req.body.year
		    },
		    options: {
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
};