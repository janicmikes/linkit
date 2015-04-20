var express = require('express');
var router = express.Router();
var linkRepo = require('../data/links');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/linkit', function (req, res, next) {
    res.render('linkit', {"title": 'LinkIt - The Link Aggregator', "user": {"name": "Janic Mikes"}, "data": linkRepo});
});

module.exports = router;
