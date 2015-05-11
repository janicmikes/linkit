var User = require('../models/user.js');

var userrepo = {
    users: require('../data/users'),
    getAllUsers: function () {
        return this.users;
    },
    addUser: function (username, password, fullname) {
        this.users.push(
            new User(users.length + 1, username, password, fullname)
        );
    },
    getUserByUsername: function (username) {
        var user = this.users.filter(function (e) {
            return e.username == username;
        })[0];

        if (user) {
            // Do not deliver the passwords
            return {
                username: user.username,
                fullname: user.fullname
            };
        }

        return false;
    }
};

module.exports = userrepo;