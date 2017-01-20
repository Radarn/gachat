'use strict';

const ChatMessage = require('./models/chatMessage.js');
const express = require('express');
const Users = require('./models/users.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs-extra');
const jwt = require('express-jwt');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
}); // Dont keep secret in the code!
const authController = require('./controllers/authentication.controller.js');
const profileController = require('./controllers/profile.controller.js');
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

  .post(authController.register)

	router.route('/user/login')

  .post(authController.login)


	router.route('/profile/uploadPhoto')

	.post(multipartMiddleware, profileController.updatePhoto)


  router.route('/profile/delete/:email')

  .delete(function(req, res) {
		const email = req.params.email;
		Users.findOne({email: email}).remove((err, data) => {
			res.json(data)
		})
	});

  router.route('/profile/updateEmail')

  .post(profileController.updateEmail);

  router.route('/profile/updateBio')

  .post(profileController.updateBio);

	app.use('/api', router);

};
