var session = {
    user: {
        username: "janicmikes"
    }
}
var userrepo = require('./userrepo');

var linkrepo = {
    links: require('./links'),
    getAllLinks: function () {
        return this.links;
    },
    addLink: function (title, url, description) {
        // TODO: Check if session user exists and use user credentials for creation
        // like:
        // "sender": session.user
        // --> session.user is a user object
        this.links.push(
            {
                "id": this.links.length + 1,
                "title": title,
                "url": url,
                "description": description,
                "rating": 0,
                "sender": userrepo.getUserByUsername(session.user.username),
                "date": Date.now()
            });
    },
    removeLinkById: function (id) {
        // TODO: Check if session user exists and if user is creator of link
        // if(session.username === links[i].sender.username)
        // or
        // if(session.userid === links[i].sender.userid)
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id === id) {
                this.links.splice(i, 1);
                break;
            }
        }
    },
    upVoteLink: function (id) {
        // TODO: (f) Check if session user exists and if user already voted for this link
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id === id) {
                this.links[i].rating++;
                break;
            }
        }
    },
    downVoteLink: function (id) {
        // TODO: (f) Check if session user exists and if user already voted for this link
        for (var i = 0; i < this.links.length; i++) {
            if (this.links[i].id === id) {
                this.links[i].rating--;
                break;
            }
        }
    }
}

module.exports = linkrepo;