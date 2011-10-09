var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/suggestions');
var Schema = mongoose.Schema;


var Suggestion = new Schema({
	title				: String,
	author			: [User],
	votes				: [Vote],
	comments		: [Comment],
	description	: String,
	created_at	: {type: Date, default: Date.now }
});

var Vote = new Schema({
	author			: [User],
	num					: { type: Number, min: -1, max: 20 },
	created_at	: {type: Date, default: Date.now }
});

var Comment = new Schema({
	author			: [User],
	comment			: String,
	created_at	: {type: Date, default: Date.now }
});

var User = new Schema({
	name				: String,
	email				: {type: String, validate : /\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/ },
	created_at	: {type: Date, default: Date.now }
});






var Suggestions = function(){};
Suggestions.prototype.list = [];



