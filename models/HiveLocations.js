var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HiveLocationSchema = new Schema({
    name: String,
    link: String,
    longitude: String,
    latitude: String,
    icon: String
});

module.exports = HiveLocations = mongoose.model('HiveLocations', HiveLocationSchema);