var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');


var port = process.env.PORT || 3000;
var mongoURI = process.env.mongoURI || 'mongodb+srv://admin:Password123@testcluster-z6dd7.mongodb.net/pollenize?retryWrites=true&w=majority';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs'
}))

app.use(express.static('www'));

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

app.use('/', require('./routes'));
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the DB');
})
    .catch((err) => {
        console.log('Not connected to the DB with err: ' + err);
    });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})