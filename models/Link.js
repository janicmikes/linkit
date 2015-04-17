/*jslint node: true */
var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  url: String,
  author: String
});

module.exports = mongoose.model('Link', LinkSchema);