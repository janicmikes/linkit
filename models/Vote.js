/*jslint node: true */
var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
  url: String,
  user: String,
  vote: Number
});

module.exports = mongoose.model('Vote', VoteSchema);
