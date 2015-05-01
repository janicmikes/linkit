var session = {
    user: {
        username: "janicmikes"
    }
}
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
            this.addLink(tmplink.title, tmplink.url, tmplink.description, tmplink.rating, tmplink.date);
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
    addLink: function (title, url, description, rating, date) {
        // TODO: Check if session user exists and use user credentials for creation
        // like:
        // "sender": session.user
        // --> session.user is a user object
        if (rating === undefined) rating = 0;
        if (date === undefined) {
            date = new Date();
        } else {
            date = new Date(date);
        }
        if (session.user.username != undefined) {
            this.links.push(
                {
                    "id": this.nextLinkId(),
                    "title": title,
                    "url": url,
                    "description": description,
                    "rating": rating,
                    "sender": userrepo.getUserByUsername(session.user.username),
                    "date": date
                }
            );
        }
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
        // TODO: (f) Check if session user exists and if user already voted for this link
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == id) {
                this.links[i].rating++;
                break;
            }
        }
    },
    downVoteLink: function (id) {
        // TODO: (f) Check if session user exists and if user already voted for this link
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id == id) {
                this.links[i].rating--;
                break;
            }
        }
    }
}

module.exports = linkrepo;