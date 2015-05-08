var express = require('express');
var router = express.Router();

var linkcontroller = require('../controllers/linkcontroller');


router.get('/', function (req, res, next) {
    console.log('get all links');
    res.render('links', {"user": req.session.username, "links": linkcontroller.getAllLinks()});
});

router.put('/', function (req, res, next) {
    //console.log('put');
    if(req.session.username !== undefined){
        if(req.body.title && req.body.url){
            if(linkcontroller.addLink(req.body.title, req.body.url, req.body.description, req.session.username)){
                res.end('{"type": "success", "text": "Link created"}');
            } else {
                res.end('{"type": "error", "text": "Failed to create link"}');
            }
        } else {
            res.end('{"type": "error", "text": "Link URL and  Title are required"}');
        }
    } else {
        res.end('{"type": "error", "text": "Unable to create link"}');
    }
});

router.delete('/:id', function (req, res, next) {
    //console.log('delete ' + req.params.id);
    if(linkcontroller.isOwner(req.session.username, req.params.id) === true){
        linkcontroller.removeLinkById(req.params.id);
        res.end('{"type": "success", "text": "Link deleted"}');
    } else {
        res.end('{"type": "error", "text": "Unable to delete link"}');
    }
});

router.post('/:id/up', function (req, res, next) {
    //console.log('upvote ' + req.params.id);
    if(req.session.username){
        linkcontroller.upVoteLink(req.params.id);
        res.end('{"type": "success", "text": "Link up voted"}');
    } else {
        res.end('{"type": "error", "text": "Unable to vote for link"}');
    }
});

router.post('/:id/down', function (req, res, next) {
    //console.log('downvote ' + req.params.id);
    if(req.session.username){
        linkcontroller.downVoteLink(req.params.id);
        res.end('{"type": "success", "text": "Down voted link"}');
    } else {
        res.end('{"type": "error", "text": "Unable to vote for link"}');
    }
});

module.exports = router;
