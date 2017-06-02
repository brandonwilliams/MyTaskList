const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Recaptcha = require('recaptcha-verify');

const config = require('../config/database');
const User = require('../models/user');

const recaptcha = new Recaptcha({
    secret: '6Ldn2SMUAAAAAEhI5pbFSAln_ENURusJ0XgCC3Px',
    verbose: true
});

// Register
router.post('/register', (req, res, next) => {
  let regError = null;
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  //console.log('Server recaptcha: '+req.body.captcha);

  recaptcha.checkResponse(req.body.captcha, (err, response) => {
        if(err) {
          res.json({success: false, msg: 'Recaptcha failed'});
          return false;
        }

    if(response.success){
      User.addUser(newUser, (error, user) => {
        if(error){
          res.json({success: false, msg: 'Failed to register user'});
        } else {
          res.json({success: true, msg: 'User registered'});
        }
      });
    } else {
      res.json({success: false, msg: 'Recaptcha failed'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
