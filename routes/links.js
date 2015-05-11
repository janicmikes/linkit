var express = require('express');
var router = express.Router();

var linkcontroller = require('../controllers/linkcontroller');


router.get('/', function (req, res, next) {
    res.send(linkcontroller.getAllLinks(req.session.username));
});

router.put('/', function (req, res, next) {
    if (req.session.username !== undefined) {
        if (req.body.title && req.body.url) {
            if (linkcontroller.addLink(req.body.title, req.body.url, req.body.description, req.session.username)) {
                res.end('{"type": "success", "text": "Link created", "action": "save"}');
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
    if (linkcontroller.isOwner(req.session.username, req.params.id) === true) {
        linkcontroller.removeLinkById(req.params.id);
        res.end('{"type": "success", "text": "Link deleted", "action": "delete", "id": ' + req.params.id + '}');
    } else {
        res.end('{"type": "error", "text": "Unable to delete link"}');
    }
});

router.post('/:id/up', function (req, res, next) {
    if (req.session.username) {
        var vote_count = linkcontroller.upVoteLink(req.params.id, req.session.username);
        res.end('{"type": "success", "text": "Link up voted", "action": "upvote", "id": ' + req.params.id + ', "value": ' + vote_count + '}');
    } else {
        res.end('{"type": "error", "text": "Login to vote for links"}');
    }
});

router.post('/:id/down', function (req, res, next) {
    if (req.session.username) {
        var vote_count = linkcontroller.downVoteLink(req.params.id, req.session.username);
        res.end('{"type": "success", "text": "Down voted link", "action": "downvote", "id": ' + req.params.id + ', "value": ' + vote_count + '}');
    } else {
        res.end('{"type": "error", "text": "Login to vote for links"}');
    }
});

module.exports = router;
