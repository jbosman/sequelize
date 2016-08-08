var express = require('express');
var wikiRouter = express.Router();

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save -> res.redirect('/');
});



wikiRouter.get('/wiki/add/', function(req, res){
	res.render("addpage");
});

wikiRouter.post('/wiki', function(req, res){
	res.send(req.body);
	res.redirect('/wiki/');
});



wikiRouter.get('/wiki/', function(req, res){
	//res.send("Made it here");
	res.render("wikipage");
	//res.redirect('/');
});





module.exports = wikiRouter;