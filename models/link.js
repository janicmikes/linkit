var Rating = require('./rating.js');

module.exports = function Link(id, title, url, description, sender) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.description = description;
    this.sender = sender;
    this.submitTime = new Date();
    this.submitTimeDisplay = ('0' + this.submitTime.getDate()).slice(-2) + "." + ('0' + this.submitTime.getMonth()).slice(-2) + "." + this.submitTime.getFullYear() + " " + ('0' + this.submitTime.getHours()).slice(-2) + ":" + ('0' + this.submitTime.getMinutes()).slice(-2);
    this.rating = new Rating();
};