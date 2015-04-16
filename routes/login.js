/*jslint node: true */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var Link = require('../models/Link.js');

/* POST /links */
router.post('/', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
});

module.exports = router;
