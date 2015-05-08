var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
    if(req.app.get('userrepo').getUserByUsername(req.body.username)){
        req.session.username = req.body.username;
    } else {
        // failed login
    }
    res.redirect('/linkit');
});

/* GET users listing. */
router.get('/logout', function (req, res, next) {
    req.session.username = undefined;
    req.session.destroy();
    res.redirect('/linkit');
});


module.exports = router;
