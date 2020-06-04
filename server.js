var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

const SeedLocations = require('./models/SeedLocations');
const HiveLocations = require('./models/HiveLocations');
const SeedShopLocations = require('./models/SeedShopLocations');
//const User = require('./models/User');

var port = process.env.PORT || 3000;
var mongoURI = process.env.mongoURI || 'mongodb+srv://admin:Password123@testcluster-z6dd7.mongodb.net/pollenize?retryWrites=true&w=majority';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('www'));

var { isAuth } = require('./middleware/isAuth');
require('./middleware/passport')(passport);

app.use(
    session({
        secret: 'pollenizeSecret',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the DB');
})
    .catch((err) => {
        console.log('Not connected to the DB with err: ' + err);
    });

app.get('/', (req, res) => {
    try {
        res.status(200).sendFile('index.html');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/admin', (req, res) => {
    try {
        res.status(200).sendFile(__dirname + '/www/admin.html');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// app.post('/createUser', async (req, res) => {
//     const { username, password } = req.body;
//     try {

//         user = new User({
//             username,
//             password
//         });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();
//         res.status(200).redirect('/admin');
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error')
//     }
// })

app.post('/signin', (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/?inccorectLogin'
        })(req, res, next)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.get('/dashboard', isAuth, (req, res) => {
    try {
        res.status(200).sendFile(__dirname + '/www/dashboard.html');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

app.post('/api/addMarker', (req, res) => {
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

app.get('/api/getMarkers', (req, res) => {
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

app.get('/api/getHives', (req, res) => {
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

app.get('/api/getSeedShops', (req, res) => {
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})