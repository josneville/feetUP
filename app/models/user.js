var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	braintree_token : String
});

module.exports = mongoose.model('user', UserSchema);