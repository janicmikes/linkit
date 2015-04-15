var express = require('express');
var router = express.Router();

/*
 * GET linklist.
 */
router.get('/linklist', function(req, res) {
    var db = req.db;
    db.collection('linklist').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST to addlink.
 */
router.post('/addlink', function(req, res) {
    var db = req.db;
    db.collection('linklist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to addlink.
 */
/*
router.put('/addlink', function(req, res) {
    var db = req.db;
    db.collection('linklist').insert(req.params, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});
*/

/*
 * DELETE to deletelink.
 */
router.delete('/deletelink/:id', function(req, res) {
    var db = req.db;
    var linkToDelete = req.params.id;
    db.collection('linklist').removeById(linkToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
