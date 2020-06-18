//Routes for actions on /api
const express = require('express');
const router = express.Router();

var { isAuth } = require('../middleware/isAuth');

const SeedLocations = require('../models/SeedLocations');
const HiveLocations = require('../models/HiveLocations');
const SeedShopLocations = require('../models/SeedShopLocations');

//Accepts Data for Seed planting location and saves to DB
router.post('/addMarker', (req, res) => {
    try {
        const { longitude, latitude, whatThreeWords, seedPacketColor, seedPacketNumber } = req.body;
        seedLocation = new SeedLocations({
            longitude,
            latitude,
            whatThreeWords,
            seedPacketColor,
            seedPacketNumber
        });
        seedLocation.save();
        res.status(200).redirect('/?success');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Gets Seed location data from DB
router.get('/getMarkers', (req, res) => {
    try {
        SeedLocations.find({}, (err, docs) => {
            if (err) throw err;
            res.status(200).send(docs);
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Accepts Data for Hive location and saves to DB - private route requires Auth
router.post('/addHive', isAuth, (req, res) => {
    try {
        const { name, link, longitude, latitude, icon } = req.body;
        hiveLocation = new HiveLocations({
            name,
            link,
            longitude,
            latitude,
            icon
        });
        hiveLocation.save();
        res.status(200).redirect('/admin/?success');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Gets Hive location data from DB
router.get('/getHives', (req, res) => {
    try {
        HiveLocations.find({}, (err, docs) => {
            if (err) throw err;
            res.status(200).send(docs);
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Accepts Data for Seed Shop location and saves to DB - private route requires Auth
router.post('/addSeedShop', isAuth, (req, res) => {
    try {
        const { name, link, longitude, latitude, icon } = req.body;
        seedShopLocation = new SeedShopLocations({
            name,
            longitude,
            latitude,
            link,
            stock
        });
        seedShopLocation.save();
        res.status(200).redirect('/admin/?success');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Gets Hive location data from DB
router.get('/getSeedShops', (req, res) => {
    try {
        SeedShopLocations.find({}, (err, docs) => {
            if (err) throw err;
            res.status(200).send(docs);
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;