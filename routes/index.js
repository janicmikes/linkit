var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/linkit');
});

router.get('/linkit', function(req, res, next) {
    res.render('index', { links: req.app.get('links') });
});

router.get('/links/', function(req, res, next) {
    console.log('get');
    res.send(req.app.get('links'));
});

router.put('/links/', function(req, res, next) {
    console.log('put');
});

router.delete('/links/:id', function(req, res, next) {
    console.log('delete ' + req.params.id);
});

router.post('/links/:id/up', function(req, res, next) {
    console.log('upvote ' + req.params.id);
    res.send('{}');
});

router.post('/links/:id/down', function(req, res, next) {
    console.log('downvote ' + req.params.id);
});

module.exports = router;
