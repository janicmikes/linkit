var linkrepo = {
    links: [],
    getAllLinks: function () {
        return this.links;
    },
    addLink: function (title, description, url) {
        // TODO: Check if session user exists and use user credentials for creation
        // like:
        // "sender": session.user
        // --> session.user is a user object
        this.links.push(
            {
                "id": this.links.length + 1,
                "title": title,
                "description": description,
                "url": url,
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