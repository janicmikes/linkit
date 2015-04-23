var express = require('express');
var router = express.Router();
var linkrepo = require('../data/links');
var data = {
  "linkrepo": linkrepo,
  "user": {
    "username": "yanickgubler",
    "fullname": "Yanick Gubler"
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/linkit');
});

router.get('/linkit', function(req, res, next) {
  res.render('linkit', data);
});

module.exports = router;
