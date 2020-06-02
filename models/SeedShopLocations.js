var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeedShopLocationSchema = new Schema({
    name: String,
    longitude: String,
    latitude: String,
    link: String,
    stock: String
});

module.exports = SeedShopLocations = mongoose.model('seedShopLocations', SeedShopLocationSchema);