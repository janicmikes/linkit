var express = require('express');
var router = express.Router();
var linkRepo = require('../data/links');

router.get('/', function(req, res, next) {
  res.send(linkRepo);
});

router.put('/', function(req, res, next) {
  console.log('put');
});

router.delete('/:id', function(req, res, next) {
  console.log('delete ' + req.param('id'));
});

router.post('/:id/up', function(req, res, next) {
  console.log('upvote ' + req.param('id'));
});

router.post('/:id/down', function(req, res, next) {
  console.log('downvote ' + req.param('id'));
});

module.exports = router;
