var express = require('express');
var router = express.Router();
var url = require('url');
var linkrepo = require('../data/linkrepo');

router.get('/', function (req, res, next) {
    res.send(linkrepo.getAllLinks());
});

router.put('/', function (req, res, next) {
    console.log('put');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    console.log(query.title);
    linkrepo.addLink(query.title, query.description, query.url);
    //linkRepo['links'].push({
    //    "title": query.title,
    //    "description": query.description,
    //    "url": query.url,
    //    "rating": query.rating,
    //    "sender": {"username": query.username, "fullname": query.fullname},
    //    "date": "2015/04/20 18:00:00"
    //});
    res.end();
});

router.delete('/:id', function (req, res, next) {
    console.log('delete ' + req.param('id'));
    linkrepo.removeLinkById(req.param('id'));
});

router.post('/:id/up', function (req, res, next) {
    console.log('upvote ' + req.param('id'));

});

router.post('/:id/down', function (req, res, next) {
    console.log('downvote ' + req.param('id'));
});

module.exports = router;
