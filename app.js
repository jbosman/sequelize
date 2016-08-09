var chalk = require('chalk');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var models = require('./models');
var app = express();
var routes = require("./routes");
var wikiRoutes = require("./routes/wiki");
var swig = require('swig');
var bodyParser = require('body-parser');

var user = models.User.sync({force:true});
var page = models.Page.sync({force:true});

// Swig settings

app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig

app.set('view engine', 'html'); // have res.render work with html files
app.set('views', path.join(__dirname, '/views'));
swig.setDefaults({ cache: false });		// Turns off caching



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( morgan('dev') );

// Setup routes
app.use("/", routes);
app.use("/", wikiRoutes);

app.listen(3000, function(req, res){
	console.log("Server is up on 3000!");
});
