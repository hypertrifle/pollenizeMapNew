var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeedLocationSchema = new Schema({
    longitude: String,
    latitude: String,
    whatThreeWords: String,
    seedPacketColor: String,
    seedPacketNumber: String,
    date: { type: Date, default: Date.now }
});

module.exports = SeedLocations = mongoose.model('seedLocations', SeedLocationSchema);