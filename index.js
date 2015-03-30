// Imports
// ====================================================
	var express 		= require('express');
	var mongoose 		= require('mongoose');
	var database 		= require('./config/database');
	var morgan 			= require('morgan');
	var bodyParser 		= require('body-parser');
	var methodOverride 	= require('method-override');
	
	var port = process.env.PORT || 3000;
	var app = express();

// Configuration
// ====================================================

	mongoose.connect(database.url);

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended' : 'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(methodOverride('X-HTTP-Method-Override'));

// Routes
// ====================================================
require('./app/routes.js')(app);


// Start Server
// ====================================================
app.listen(port);
console.log("App Listening On : \n" + 'http://localhost:' + port);