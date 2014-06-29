var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');
var morgan 		= require('morgan');
var bodyParser  = require('body-parser'); 
var multer 		= require('multer');
var braintree 	= require('braintree');

var database = require('./config/database');
mongoose.connect(database.url);

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "8np5zj4n5ckvc8q6",
  publicKey: "fygtd4wpcpdwh4z7",
  privateKey: "fbf661d9e68a77fb0a81d03cfbfa90a3"
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env){
	app.use(morgan('dev'));
}

app.use(express.static(__dirname + '/public'));
app.use(multer({ dest: './public/uploads/'}));
app.use(bodyParser());
require('./app/routes/index.js')(app);
require('./app/routes/homeless.js')(app);
require('./app/routes/braintree.js')(app, gateway);

app.listen(3000, "127.0.0.1");
console.log("App is running on port 3000");
