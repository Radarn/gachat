var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose 	   = require('mongoose');
var api = require('./app/api');

var db = require('./config/db');

var port = process.env.PORT || 8000;

mongoose.connect(db.url);

app.use('/node_modules', express.static(`${__dirname}/node_modules`));
app.use('/public', express.static(`${__dirname}/public`));

app.use(methodOverride('X-HTTP-Method-Override'));

//app.use(express.static(__dirname + '/public'));

// routes ==================================================
api(app); // configure our routes

// start ap ===============================================
// startup our app at http://localhost:8000
app.listen(port);

// shoutout to the user
console.log('Listening on port ' + port);

// expose app
//exports = module.exports = app;
