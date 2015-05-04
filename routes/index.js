var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.app.get('linkrepo').initDemo();
    res.redirect('/linkit');
});

router.get('/linkit', function (req, res, next) {
    console.log('get Frontend');
    res.render('index', {"user": req.app.get('userrepo').getUserByUsername(req.session.username), "links": req.app.get('linkrepo').getAllLinks()});
});

module.exports = router;
