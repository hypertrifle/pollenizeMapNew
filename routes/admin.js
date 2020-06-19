//Routes for actions on /admin

const express = require('express');
const router = express.Router();
var passport = require('passport');

var { isAuth } = require('../middleware/isAuth');
require('../middleware/passport')(passport);

const User = require('../models/User');

router.use(express.static('www'));


//Reutrns Login for Admin
router.get('/', (req, res) => {
    try {
        if (req.user == null) {
            res.status(200).render('admin', { layout: 'admin' });
        } else {
            res.redirect('/admin/dashboard');
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Accepts data for new user
router.post('/createUser', async (req, res) => {
    const { username, password } = req.body;
    try {

        user = new User({
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).redirect('/admin');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Accepts login credentials and processes for auth
router.post('/signin', (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/?incorrectLogin'
        })(req, res, next)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//Deserializes current session
router.get('/signout', (req, res) => {
    //Logs the logged in user out and redirects to the sign in page
    req.logout();
    res.redirect('/');
})

//Returns Admin dashboard - private route, requires Auth
router.get('/dashboard', isAuth, (req, res) => {
    try {
        res.status(200).render('adminDashboard', { layout: 'admin' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;