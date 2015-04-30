var express = require('express');
var router = express.Router();
var url = require('url');

router.get('/', function (req, res, next) {
    res.send(linkrepo.getAllLinks());
});

router.put('/', function (req, res, next) {
    console.log('put');
    console.log(req.body);
    req.app.get('linkrepo').addLink(req.body.title, req.body.url, req.body.description);
    res.send('{"text": "thanks for the data"}');
    //res.end();
});

router.delete('/:id', function (req, res, next) {
    console.log('delete ' + req.params.id);
    req.app.get('linkrepo').removeLinkById(req.params.id);
    res.send('{"text": "removed link"}');
});

router.post('/:id/up', function (req, res, next) {
    console.log('upvote ' + req.params.id);
    req.app.get('linkrepo').upVoteLink(req.params.id);
    res.send('{"text": "up voted link"}');
});

router.post('/:id/down', function (req, res, next) {
    console.log('downvote ' + req.params.id);
    req.app.get('linkrepo').downVoteLink(req.params.id);
    res.send('{"text": "down voted link"}');
});

module.exports = router;
