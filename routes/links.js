/*jslint node: true */
var express = require('express');
var router = express.Router();

/*
 * GET links.
 */
router.get('/links', function(req, res) {
    var db = req.db;
    db.collection('links').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to links.
 */
router.post('/links', function(req, res) {
    var db = req.db;
    db.collection('links').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to links.
 */
/*
router.put('/links', function(req, res) {
    var db = req.db;
    db.collection('links').insert(req.params, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
*/

/*
 * DELETE to deletelink.
 */
router.delete('/links/:id', function(req, res) {
    var db = req.db;
    var linkToDelete = req.params.id;
    db.collection('links').removeById(linkToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * POST to upvote links.
 */
router.post('/links/:id/up', function(req, res) {
    var db = req.db;
    db.collection('links').updateById(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * POST to downvote links.
 */
router.post('/links/:id/down', function(req, res) {
    var db = req.db;
    db.collection('links').updateById(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
