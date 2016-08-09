var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;
var console = require('console-advanced');


wikiRouter.get('/', function(req, res){

	Page.findAll()
		.then(function(pages){
	    	res.render('index', {pages: pages});
	})
	.catch(function(err) {
	    throw new Error(err);
	});


});


wikiRouter.get('/wiki/add', function(req, res, next) {
    res.render('addpage');
});



wikiRouter.post('/wiki/add', function(req, res, next) {

  // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    var url = req.body.title.split(' ').join('_');
    
  var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      urlTitle: url
  });

  User.findOrCreate({
	  	where: {
	    	name: req.body.name,
	    	email: req.body.email
	  		}
		})
		.then(function (values) {

	  		var user = values[0];

			  var page = Page.build({
			    title: req.body.title,
			    content: req.body.content,
			    urlTitle: url
			  });

	  	return page.save().then(function (page) {
	    return page.setAuthor(user);
  	});

	})
	.then(function (page) {
  		res.redirect(url);
	})
	.catch(next);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback

});

wikiRouter.get('/wiki/:page', function(req, res, next) {

	var urlTitleNew = req.params.page;

    Page.findOne({
	where: {
	    urlTitle: urlTitleNew 
	}
    })
	.then(function(foundPage){
	    res.render('wikipage', {
	    	"title": foundPage.title,
	    	"author": foundPage.name,
	    	"content": foundPage.content
	     });
	})
	.catch(function(err) {
	    throw new Error(err);
	});
    
});

wikiRouter.get('/wiki/', function(req, res){
	res.render("wikipage");
});

wikiRouter.get('/users', function(req, res, next) {

    
	User.findAll()
	.then(function(users){
	    console.log("USERS:", users);
	    	res.render('users', {users: users});
	})
	.catch(function(err) {
	    throw new Error(err);
	});

});







module.exports = wikiRouter;
