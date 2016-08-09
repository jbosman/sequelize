var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;
var console = require('console-advanced');
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

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback

    page.save()
	.then(function() {
	res.redirect(url);
	})
	.catch(function(err) {
	throw new Error(err);
    });
});

wikiRouter.get('/wiki/:page', function(req, res, next) {

    Page.findOne({
	where: {
	    urlTitle: req.params.page 
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





module.exports = wikiRouter;
