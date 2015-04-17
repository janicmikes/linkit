/*jslint node: true */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  fullname: String
});

module.exports = mongoose.model('User', UserSchema);
