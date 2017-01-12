const ChatMessage = require('./models/chatMessage.js');
const express = require('express');
const Users = require('./models/users.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs-extra');

const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	app.use(cookieParser());
	app.use(session({secret: 'anystringoftext',
		saveUninitialized: true, resave: true}));

	var router = express.Router();

	router.use(function(req, res, next) {
			console.log("COOKIES", req.cookies)
			console.log("SESSION ID", req.sessionID)
			console.log("SESSION", req.session);
	    console.log('Method passed to server: ' + req.method);
	    next();
	});

	router.route('/cookie')

	.get((req, res) => {
		// NEED TO READ UP ON COOKIES IN GENERAL AND HOW THEY WORK!
	});

	router.route('/messages/:gameName')

	.get(function(req, res) {
		ChatMessage.find({ 'type': req.originalUrl }, function(err, messages) {
		    if (err)
		        res.send(err);

		    res.json(messages);
		})
	})

	.post(function(req, res) {
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

		Users.find(req.body, function(err, user) {
			if (err) {
				res.send(err);
			}

			if (user && user.length === 1) {
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
