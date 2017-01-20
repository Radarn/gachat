'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs-extra');
const path = require('path');

module.exports.profileRead = (req, res) => {

  // If no user ID exists in the JWT return a 401
  // Should do more error trapping
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec((err, user) => {
        res.status(200).json(user);
      });
  }
};

module.exports.updatePhoto = function(req, res) {
  const file = req.files.file;
  const email = req.body.email

  console.log(`User ${email} is submitting`, file)
  // NEED TO MAKE THIS UNIQUE
  let uploadDate = new Date();

  const tempPath = file.path;
  const targetPath = path.join(__dirname, `../../uploads/${email}${uploadDate}${file.name}`);
  const savePath = `/uploads/${email}${uploadDate}${file.name}`;

  fs.rename(tempPath, targetPath, (err) => {
    if (err) {
      console.log(err)
    } else {
      User.findOne({email: email}, (err, userData) => {
        if (!userData)
          console.log(err)
        let user = userData;
        user.image = savePath;
        user.save((err) => {
          if (err)
            console.log("Failed Save");
            res.json({status: 500})

          console.log("save successful");

          res.json({status: 200})
        })
      });
    }
  });
}

module.exports.updateEmail = function(req, res) {
  const email = req.body.email
  const newEmail = req.body.newEmail

  User.findOne({email: email}, (err, userData) => {
    if (err)
      console.log("failed updateEmail")
    let user = userData;
    console.log("userData", user)
    user.email = newEmail;

    user.save((err) => {
      if (err)
        console.log("fail")

      console.log("successfully updated email")
    });
  });
}

module.exports.updateBio = function(req, res) {
  const email = req.body.email
  const bio = req.body.bio
  console.log("BIO", bio);

  User.findOne({email: email}, (err, userData) => {
    if (err)
      console.log("failed update bio")
    let user = userData;
    user.bio = bio;
    console.log("userData", user)

    user.save((err) => {
      if (err)
        console.log("fail")

      console.log("successfully updated bio")
    });
  });
}

/*module.exports.updateUserInfo = function(req, res) {
  switch (req.body.type) {
    case 'UPDATE_EMAIL':
      const email = req.body.email
      const newEmail = req.body.newEmail

      User.findOne({email: email}, (err, userData) => {
        if (err)
          console.log("failed updateEmail")
        let user = userData;
        console.log("userData", user)
        user.email = newEmail;

        user.save((err) => {
          if (err)
            console.log("fail")

          console.log("successfully updated email")
        });
      });

    case 'UPDATE_BIO':
      let email = req.body.email
      const bio = req.body.bio
      console.log("BIO", bio);

      User.findOne({email: email}, (err, userData) => {
        if (err)
          console.log("failed update bio")
        let user = userData;
        user.bio = bio;
        console.log("userData", user)

        user.save((err) => {
          if (err)
            console.log("fail")

          console.log("successfully updated bio")
        });
      });

      default:
        return '';
    }
}*/
