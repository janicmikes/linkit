var express = require('express');
var router = express.Router();

var usercontroller = require('../controllers/usercontroller');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    if(usercontroller.getUserByUsername(req.body.username)){
        req.session.username = req.body.username;
    } else {
        // failed login
    }
    res.redirect('/linkit');
});

/* GET users listing. */
router.get('/logout', function (req, res, next) {
    req.session.username = null;
    req.session.destroy();
    res.redirect('/linkit');
});

module.exports = router;
