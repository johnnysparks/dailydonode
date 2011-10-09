// Load Crypto for keygen
var crypto = require('crypto');


/////
// defineModels establishes the framework for votes and suggestions
//	Create a new suggestion:
//		var s1 = new Suggestion({title: "Buy a House", description: "From down payment to move-in"});
//
//	Save a suggestion to the database:
//		s1.save(function(err){
//		  if(err){ console.log(err); }
//	  	else { console.log("Save Successful"); }
//		});
//	
//	Pull Suggestions from database:
//		Suggestion.find({}, function(err, docs){
//		  if(err){ console.log(err); }
//			else {
//				console.log("Find Successful!");
//		    console.log(docs);
//		  }
//	});
////
function defineModels(mongoose, callback){

	var Schema = mongoose.Schema;

	var Suggestion = new Schema({
		title					: String,
		votes				  : [Vote],
		total_votes		: {type: Number, default: 0 },
		description		: String,
		created_at	  : {type: Date, default: Date.now }
	});

	var Vote = new Schema({
		num					: { type: Number, min: -1, max: 20 },
		created_at	: {type: Date, default: Date.now }
	});
	
	// map the Schemas to the model name
	mongoose.model("Suggestion", Suggestion);
	mongoose.model("Vote", Vote);

	callback();
}

exports.defineModels = defineModels;


/*
var s1 = new Suggestion({title: "Buy a House", description: "From down payment to move-in"});

s1.save(function(err){
	if(err){
		 console.log(err) 
	}else {
		console.log("Save Successful");
	}
});

Suggestion.find({}, function(err, docs){
	if(err){
		console.log(err);
	} else {
		console.log("Find Successful!");
		console.log(docs);
	}
});

*/

