var express = require('express');
var router = express.Router();

var session = {
    user: {
        username: "janicmikes",
        fullname: "Janic Mikes"
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    req.app.get('linkrepo').initDemo();
    res.redirect('/linkit');
});

router.get('/linkit', function (req, res, next) {
    console.log('get Frontend');
    res.render('index', {"user": session.user, "links": req.app.get('linkrepo').getAllLinks()});
});

module.exports = router;
