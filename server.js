var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

mongoose.connect("mongodb://localhost/mgGMaps");

// Parsing & logging
app.use(express.static(__dirname + '/public'));                 // sets static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use bower components
app.use(morgan('dev'));                                         // log w/ Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
require('./app/routing.js')(app);

app.listen(port);
console.log('App listening on port ' + port);