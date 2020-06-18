//Data model for Seed Shop Locations
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeedShopLocationSchema = new Schema({
    name: String,
    longitude: String,
    latitude: String,
    link: String,
    stock: String,
    date: { type: Date, default: Date.now }
});

module.exports = SeedShopLocations = mongoose.model('SeedShopLocations', SeedShopLocationSchema);