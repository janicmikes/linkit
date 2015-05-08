var User = require('../models/user.js');

var userrepo = {
    users: require('../data/users'),
    getAllUsers: function () {
        return this.users;
    },
    addUser: function (username, password, fullname) {
        this.users.push(
            new User(users.length+1,username,password,fullname)
        );
    },
    getUserByUsername: function(username){
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                return {
                    id: this.users[i].id,
                    username: this.users[i].username,
                    fullname: this.users[i].fullname
                };
            }
        }
        return false;
    }
};

module.exports = userrepo;