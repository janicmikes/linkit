var Link = require('../models/link');
var usercontroller = require('../controllers/usercontroller');

var linkrepo = {
    links: [],
    demolinks: require('../data/links'),
    initDemo: function () {
        console.log('reset to demo data');
        this.links = [];
        this.sequence = 0;
        for (var i = 0; i < this.demolinks.length; i++) {
            var tmplink = this.demolinks[i];
            this.addLink(tmplink.title, tmplink.url, tmplink.description, tmplink.sender);
        }
    },
    sequence: 0,
    nextLinkId: function () {
        return ++this.sequence;
    },
    getAllLinks: function () {
        return this.links
            .sort(function (a, b) {
                return b.rating.value - a.rating.value;
            });
    },
    addLink: function (title, url, description, sender) {
        if (sender !== undefined) {
            this.links.push(
                new Link(this.nextLinkId(), title, url, description, usercontroller.getUserByUsername(sender))
            );
        }
        return true;
    },
    removeLinkById: function (id) {
        // TODO: Check if session user exists and if user is creator of link
        // if(session.username === links[i].sender.username)
        // or
        // if(session.userid === links[i].sender.userid)
        console.log('remove ' + id);
        console.log(this.links.length);
        for (var i = 0; i < this.links.length; i++) {
            console.log(this.links[i].id);
            if (this.links[i].id == id) {
                console.log('found link -> remove');
                this.links.splice(i, 1);
                break;
            }
        }
    },
    upVoteLink: function (id, username) {
        return this.getLinkById(id).rating._up(username);
    },
    downVoteLink: function (id, username) {
        return this.getLinkById(id).rating._down(username);
    },
    getLinkById: function(id){
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == id) {
                return this.links[i];
            }
        }
    },
    isOwner: function (username, id){
        return username !== undefined && this.getLinkById(id).sender.username == username;
    }
};

module.exports = linkrepo;