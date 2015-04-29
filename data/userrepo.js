var userrepo = {
    users: require('./users'),
    getAllUsers: function () {
        return this.users;
    },
    addUser: function (username, password, fullname) {
        this.users.push(
            {
                "username": username,
                "password": password,
                "fullname": fullname
            });
    },
    getUserByUsername: function(username){
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                return {
                    username: this.users[i].username,
                    fullname: this.users[i].fullname
                }
            }
        }
    }
}

module.exports = userrepo;