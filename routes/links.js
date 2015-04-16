/*jslint node: true */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Link = require('../models/Link.js');

/* GET /links listing. */
router.get('/', function (req, res, next) {
  Link.find(function (err, links) {
    if (err) {
      return next(err);
    }
    res.json(links);
  });
});

/* POST /links */
router.post('/', function (req, res, next) {
  Link.create(req.body, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

/* GET /links/id */
router.get('/:id', function (req, res, next) {
  Link.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

/* PUT /links/:id */
router.put('/:id', function (req, res, next) {
  Link.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});


/* DELETE /links/:id */
router.delete('/:id', function (req, res, next) {
  Link.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

module.exports = router;
