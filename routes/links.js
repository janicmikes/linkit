var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    console.log('get all links');
    res.render('links', {"user": req.app.get('userrepo').getUserByUsername(req.session.username), "links": req.app.get('linkrepo').getAllLinks()})
});

router.put('/', function (req, res, next) {
    //console.log('put');
    if(req.session.username != undefined){
        if(req.body.title && req.body.url){
            if(req.app.get('linkrepo').addLink(req.body.title, req.body.url, req.body.description, req.session.username)){
                res.end('{"type": "success", "text": "Link created"}');
            } else {
                res.end('{"type": "error", "text": "Failed to create link"}');
            }
        } else {
            res.end('{"type": "error", "text": "Link URL and  Title are required"}');
        }
    } else {
        res.end('{"type": "error", "text": "Unable to create link"}')
    }
});

router.delete('/:id', function (req, res, next) {
    //console.log('delete ' + req.params.id);
    if(req.app.get('linkrepo').isOwner(req.session.username, req.params.id) === true){
        req.app.get('linkrepo').removeLinkById(req.params.id);
        res.end('{"type": "success", "text": "Link deleted"}');
    } else {
        res.end('{"type": "error", "text": "Unable to delete link"}')
    }
});

router.post('/:id/up', function (req, res, next) {
    //console.log('upvote ' + req.params.id);
    if(req.session.username){
        req.app.get('linkrepo').upVoteLink(req.params.id);
        res.end('{"type": "success", "text": "Link up voted"}');
    } else {
        res.end('{"type": "error", "text": "Unable to vote for link"}')
    }
});

router.post('/:id/down', function (req, res, next) {
    //console.log('downvote ' + req.params.id);
    if(req.session.username){
        req.app.get('linkrepo').downVoteLink(req.params.id);
        res.end('{"type": "success", "text": "Down voted link"}');
    } else {
        res.end('{"type": "error", "text": "Unable to vote for link"}')
    }
});

module.exports = router;
