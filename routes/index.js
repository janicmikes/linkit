var express = require('express');
var router = express.Router();
var linkrepo = require('../data/linkrepo');

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    res.redirect('/linkit');
});

router.get('/linkit', function (req, res, next) {
    res.render('linkit', {"title": 'LinkIt - The Link Aggregator', "user": {"username": "janicmikes", "fullname": "Janic Mikes"}, "data": linkrepo.getAllLinks()});
});

module.exports = router;
