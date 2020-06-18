//Routes for actions on /api
const express = require('express');
const router = express.Router();

const json2csv = require('json2csv').parse;

const fs = require('fs');
const path = require('path');

const moment = require('moment');

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

//See Location CSV
router.get('/getSeedCSV', (req, res) => {
    let csv;
    try {
        SeedLocations.find({}, (err, docs) => {
            if (err) throw err;
            const fields = ['longitude', 'latitude', 'whatThreeWords', 'seedPacketColor', 'seedPacketNumber'];
            csv = json2csv(docs, { fields });

            const dateTime = moment().format('YYYYMMDDhhmmss');
            const filePath = path.join(__dirname, "..", "www", "exports", "seedlocations-" + dateTime + ".csv")
            fs.writeFile(filePath, csv, function (err) {
                if (err) {
                    return res.json(err).status(500);
                }
                else {
                    setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)
                    return res.redirect("/exports/seedlocations-" + dateTime + ".csv");
                }
            });

            //res.status(200).download(csv);
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