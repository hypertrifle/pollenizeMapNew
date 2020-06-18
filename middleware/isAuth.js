//Checks User authentication on the current session
module.exports = {
    isAuth: (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.redirect('/?notAuth');
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    }
}