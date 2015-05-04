var userrepo = require('./userrepo');

var linkrepo = {
    links: [],
    demolinks: require('./links.json'),
    initDemo: function () {
        console.log('reset demo');
        this.links = [];
        this.sequence = 0;
        for (var i = 0; i < this.demolinks.length; i++) {
            var tmplink = this.demolinks[i];
            this.addLink(tmplink.title, tmplink.url, tmplink.description, tmplink.sender, tmplink.rating, tmplink.date);
        }
    },
    sequence: 0,
    nextLinkId: function () {
        return ++this.sequence;
    },
    getAllLinks: function () {
        return this.links
            .sort(function (a, b) {
                return b.rating - a.rating;
            });
    },
    addLink: function (title, url, description, sender, rating, date) {
        if (rating === undefined) rating = 0;
        if (date === undefined) {
            date = new Date();
        }
        if (sender != undefined) {
            this.links.push(
                {
                    "id": this.nextLinkId(),
                    "title": title,
                    "url": url,
                    "description": description,
                    "rating": rating,
                    "sender": userrepo.getUserByUsername(sender),
                    "date": date
                }
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
    upVoteLink: function (id) {
        this.getLinkById(id).rating++;
    },
    downVoteLink: function (id) {
        this.getLinkById(id).rating--;
    },
    getLinkById: function(id){
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == id) {
                return this.links[i];
            }
        }
    },
    isOwner: function (username, id){
        return username != undefined && this.getLinkById(id).sender.username == username;
    }
}

module.exports = linkrepo;