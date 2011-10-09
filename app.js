
/**
 * Module dependencies.
 */
var express = require('express');
var app = module.exports = express.createServer();
var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/suggestions');
var models = require('./lib/suggest');



// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static( __dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


models.defineModels(mongoose, function(){
	app.Suggestion = Suggestion = mongoose.model('Suggestion');
	app.Vote = Vote = mongoose.model('Vote');
});


//root home page
// "app.get" sets the route
// req = request (contains extra parameters when availible)
// res = result; "render" uses jade rendering engine and passes data to template
// PostProvider queries mongodb for posts "findAll" returns array of post objects
app.get('/', function(req, res){
	var s = new Suggestion({ title: 'Some Brilliant Idea', votes : {num:1}, description: 'This should take about 3 months'});
	/*
	s.save(function(err){
		if(err) { console.log(err);}
		else { console.log('victory'); }
	});
	*/
	Suggestion.find({}, function(err, suggestionList){
		res.render('index.jade', {
	 		locals: {
	  	  title: 'Mongo Node.js Blog',
				suggestions : suggestionList
	  	}
		});
	});
});

app.get('/mu-8cd913cd-c65f39be-95e8a8f1-63568352', function(req, res){
	res.send('42');
});



/*
//looks in the posts view directory and grabbs the "new.jade" template to render
app.get('/posts/new', function(req, res){
  res.render('posts/new', {
     locals: {
       title: 'New Post'
     }
  });
});

//create
app.post('/posts/new', function(req, res){
  PostProvider.save({
	title: req.param('title'),
    body: req.param('body')
  }, function(error, docs) {
	res.redirect('/');
  });
});

//show
app.get('/posts/:id', function(req, res){
  PostProvider.findById(req.param('id'), function(error, post) {
    res.render('posts/', {
      locals: {
		title: post.title,
        post:post
      }
    });
  });
});

//edit
app.get('/posts/:id/edit', function(req, res){
  PostProvider.findById(req.param('id'), function(error, post) {
    res.render('posts/edit', {
      locals: {
        title: post.title,
        post:post
      }
    });
  });
});

//update
app.post('/posts/:id/edit', function(req, res){
  PostProvider.updateById(req.param('id'), req.body, function(error, post) {
    res.redirect('/');
  });
});

//add comment
app.post('/posts/addComment', function(req, res){
  PostProvider.addCommentToPost(req.body._id, {
    person: req.body.person,
    comment: req.body.comment,
    created_at: new Date()
  }, function(error, docs) {
    res.redirect('/posts/' + req.body._id)
  });
});
*/


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}

