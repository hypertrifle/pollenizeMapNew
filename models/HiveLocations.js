//Data model for Hive Locations
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HiveLocationSchema = new Schema({
    name: String,
    link: String,
    longitude: String,
    latitude: String,
    icon: { type: String, default: 'newIcon' },
    date: { type: Date, default: Date.now }
});

module.exports = HiveLocations = mongoose.model('HiveLocations', HiveLocationSchema);