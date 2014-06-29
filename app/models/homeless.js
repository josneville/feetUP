var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HomelessSchema = new Schema(
{
	name : String,
	pictureUrl : String,

	bio : String,

	supporters : 
	[
		{
			id : String,
			name : String, 
			amount : Number
		}
	],

	dailyNeeds : 
	{
		food : 
		{ 
			current : Number,
			total : Number
		},
		shelter : 
		{
			current : Number, 
			total : Number
		},
		clothing : 
		{
			current : Number,
			total : Number
		}
	},

	goals : 
	[
		{
			title : String,
			subgoals:
				[
					{
						subgoaltitle : String,
						current : Number,
						total : Number
					}
				]
		}
	]
});

module.exports = mongoose.model('homeless', HomelessSchema);