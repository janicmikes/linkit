module.exports = function Rating() {
    this.value = 0;
    var voters = [];
    var this_rating = this;
    this.getValue = (function(){
        return this.value;
    });
    this._voteable = function(username){
        if(!username || voters[username]){
            return false;
        } else {
            return true;
        }
    };

    this._up = function(username) {
        if (username && !voters[username]) {
            this_rating.value++;
            voters[username] = true;
        }
        return this_rating.value;
    };

    this._down = function (username) {
        if (username && !voters[username]) {
            this_rating.value--;
            voters[username] = true;
        }
        return this_rating.value;
    };
};


