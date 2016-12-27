var ChatMessage = require('./models/chatMessage.js');
var express = require('express');
var Users = require('./models/users.js');
var bodyParser = require('body-parser');
var cors = require('cors');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs-extra');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	var router = express.Router();

	router.use(function(req, res, next) {
	    console.log('Method passed to server: ' + req.method);
	    next();
	});

	router.route('/messages/:gameName')

	.get(function(req, res) {
		console.log(req.originalUrl);
		ChatMessage.find({ 'type': req.originalUrl }, function(err, messages) {
		    if (err)
		        res.send(err);

		    res.json(messages);
		})
	})

	.post(function(req, res) {
		console.log(req.body.newMessage)
		console.log(req.body);
		var incMessage = req.body.newMessage
		var newMessage = ChatMessage({
			message: incMessage,
			type: req.originalUrl,
			user: req.body.user,
			date: Date.now()
		})

		ChatMessage.create(newMessage, function(err, message) {
			res.json(message)
		})
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

	router.route('/profile/edit')

	.post(multipartMiddleware, (req, res) => {
		const file = req.file;
		const userId = req.body.userId;
		console.log("User " + userId + " fs submitting ", file);
	})

	app.use('/api', router);

};
