var ChatMessage = require('./models/ChatMessage.js');
var express = require('express');

module.exports = function(app) {

	var router = express.Router();

	router.use(function(req, res, next) {
	    console.log('Method passed to server: ' + req.method);
	    next();
	});

	router.route('/api/messages')

	.get(function(req, res) {
		ChatMessage.find(function(err, messages) {
		    if (err)
		        res.send(err);

		    res.json(nerds); // return all nerds in JSON format
		});
	});
};