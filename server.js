const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose 	   = require('mongoose');
const passport = require('passport');
const api = require('./app/api');

const db = require('./config/db');
require('./config/passport');

const port = process.env.PORT || 8000;

mongoose.connect(db.url);

app.use('/node_modules', express.static(`${__dirname}/node_modules`));
app.use('/public', express.static(`${__dirname}/public`));

app.use(methodOverride('X-HTTP-Method-Override'));

//app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

// routes ==================================================

api(app); // configure our routes

// start ap ===============================================
// startup our app at http://localhost:8000
app.listen(port);

// shoutout to the user
console.log('Listening on port ' + port);

// expose app
//exports = module.exports = app;
