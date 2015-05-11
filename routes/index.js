var express = require('express');
var router = express.Router();

var linkcontroller = require('../controllers/linkcontroller');
var usercontroller = require('../controllers/usercontroller');

router.get('/', function (req, res, next) {
    linkcontroller.initDemo();
    res.redirect('/linkit');
});

router.get('/linkit', function (req, res, next) {
    res.render('index', {"user": usercontroller.getUserByUsername(req.session.username), "links": linkcontroller.getAllLinks()});
});

module.exports = router;
