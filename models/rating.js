module.exports = function Rating() {
    this.value = 0;
    var voters = [];
    var this_rating = this;

    this._up = function(username) {
        if (!voters[username]) {
            this_rating.value++;
            voters[username] = true;
        }
        return this_rating.value;
    };

    this._down = function (username) {
        if (!voters[username]) {
            this_rating.value--;
            voters[username] = true;
        }
        return this_rating.value;
    };
};


