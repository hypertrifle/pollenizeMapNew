var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const SeedLocations = require('./models/SeedLocations');
const HiveLocations = require('./models/HiveLocations')

var port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((__dirname + '/www', express.static('www')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/leafletjs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.post('/api/addMarker', (req, res) => {
    //if (err) throw err;
    const { longitude, latitude, whatThreeWords, seedPacketColor, seedPacketNumber } = req.body;
    seedLocation = new SeedLocations({
        longitude,
        latitude,
        whatThreeWords,
        seedPacketColor,
        seedPacketNumber
    });
    seedLocation.save();
    res.status(200);
    res.redirect('/?success');
})

app.get('/api/getMarkers', (req, res) => {
    SeedLocations.find({}, (err, docs) => {
        if (err) throw err;
        console.log(docs)
        res.send(docs);
    })
})

app.get('/api/getHives', (req, res) => {
    HiveLocations.find({}, (err, docs) => {
        if (err) throw err;
        console.log(docs)
        res.send(docs);
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})