var Link = require('../models/link');
var usercontroller = require('../controllers/usercontroller');

var linkrepo = {
    links: [],
    demolinks: require('../data/links'),
    initDemo: function () {
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
    getAllLinks: function (username) {
        var allLinks = [];

        for (var i = 0; i < this.links.length; i++) {
            var tmpLink = this.links[i];
            tmpLink.permissions = {
                vote: tmpLink.rating._voteable(username),
                delete: this.isOwner(username, tmpLink.id)
            };
            allLinks.push(tmpLink);
        }

        return allLinks.sort(function (a, b) {
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
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == id) {
                this.links.splice(i, 1);
                break;
            }
        }
    },
    upVoteLink: function (id, username) {
        return this.getLinkById(id).rating._up(username);
    },
    downVoteLink: function (id, username) {
        var link = this.getLinkById(id);
        return link.rating._down(username);
    },
    getLinkById: function (id) {
        return this.links.filter(function (e) {
            return e.id == id;
        })[0];
    },
    isOwner: function (username, id) {
        return username !== undefined && this.getLinkById(id).sender.username == username;
    }
};

module.exports = linkrepo;