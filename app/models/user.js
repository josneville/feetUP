var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	facebook_token : String,
	braintree_token : String
});

module.exports = mongoose.model('user', UserSchema);