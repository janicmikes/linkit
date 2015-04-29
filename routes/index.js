var express = require('express');
var router = express.Router();
var linkrepo = require('../data/linkrepo');
var session = {
    user: {
        username: "janicmikes",
        fullname: "Janic Mikes"
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    res.redirect('/linkit');
});

router.get('/linkit', function (req, res, next) {
    console.log('get Frontend');
    res.render('linkit', {"user": session.user, "links": linkrepo.getAllLinks()});
});

module.exports = router;
