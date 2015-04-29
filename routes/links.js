var express = require('express');
var router = express.Router();
var url = require('url');
var linkrepo = require('../data/linkrepo');

router.get('/', function (req, res, next) {
    res.send(linkrepo.getAllLinks());
});

router.put('/', function (req, res, next) {
    console.log('put');
    console.log(req.body);
    linkrepo.addLink(req.body.title, req.body.url, req.body.description);
    res.send('{"text": "thanks for the data"}');
    //res.end();
});

router.delete('/:id', function (req, res, next) {
    console.log('delete ' + req.params.id);
    linkrepo.removeLinkById(req.params.id);
    res.end();
});

router.post('/:id/up', function (req, res, next) {
    console.log('upvote ' + req.params.id);
    linkrepo.upVoteLink(req.params.id);
    res.end();
});

router.post('/:id/down', function (req, res, next) {
    console.log('downvote ' + req.params.id);
    linkrepo.downVoteLink(req.params.id);
    res.end();
});

module.exports = router;
