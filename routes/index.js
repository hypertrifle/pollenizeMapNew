//Routes for actions on /
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).render('index', { layout: 'public' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;