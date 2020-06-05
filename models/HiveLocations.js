var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HiveLocationSchema = new Schema({
    name: String,
    link: String,
    longitude: String,
    latitude: String,
    icon: { type: String, default: 'newIcon' }
});

module.exports = HiveLocations = mongoose.model('HiveLocations', HiveLocationSchema);