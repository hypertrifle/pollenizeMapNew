const express = require('express');
const router = express.Router();

var { isAuth } = require('../middleware/isAuth');

const SeedLocations = require('../models/SeedLocations');
const HiveLocations = require('../models/HiveLocations');
const SeedShopLocations = require('../models/SeedShopLocations');

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