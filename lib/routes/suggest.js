////////////////////
//	NEW SUGGESTION
//	(db, callback)
//

var Suggestion = function(db){};

Suggestion.prototype.create = function(entry, callback){

	db.suggestions.save({
		title: params.title, 
		description: params.description
	}, function(err){
		console.log(err);
	});
};


