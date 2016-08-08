var chalk = require('chalk');
var morgan = require('morgan');
var path = require('path');
var express = require('express');

var app = express();
var routes = ("./routes");


var swig = require('swig');
var bodyParser = require('body-parser');

// Swig settings
//app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set(path.join(__dirname, '/views'));
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
swig.setDefaults({ cache: false });		// Turns off caching

//router.use(express.static('public'));

// Middleware functions
// function ServerMessage(string){
// 	console.log(chalk.blue(string));
// }

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( morgan('dev') );

// Setup routes
//app.use("/", routes);

app.listen(3000, function(req, res){
	console.log("Server is up on 3000!");
});