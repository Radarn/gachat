var ChatMessage = require('./models/chatMessage.js');
var express = require('express');
var Users = require('./models/users.js');

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

		    res.json(messages); // return all nerds in JSON format
		});
	});

	router.route('/users')

	.post(function(req, res) {
		console.log(req.body)
		var newUser = {
			email: req.body.email,
			password: req.body.password
		}
		
		Users.create(newUser, function(err, user) {
			console.log(user)
			res.send("Success! " + user + " was created!")
		})
		
	});

	router.route('/user/login')

	.post(function(req, res) {
		console.log(req.body)
		
		Users.find(req.body, function(err, user) {
			if (err) {
				res.send(err);
			}

			if (user && user.length === 1) {
				console.log("FOUND USER")
				var userData = user[0]
			
				res.json({
					email: req.body.email,
					_id: userData._id
				});
			} else {
				console.log("DID NOT FIND USER")
				res.send(user)
			}
		})
		
	});

	app.use('/api', router);
	
};