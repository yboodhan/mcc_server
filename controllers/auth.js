let router = require('express').Router();
let passport = require('../config/passportConfig');

require('dotenv').config();
let CLIENT_URL = process.env.CLIENT_URL;

// LOCAL AUTH -----------------------------------------------------------------
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/auth/login/failed'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log(req.user, 'is my user')
        return res.json({
            message: "User has successfully authenticated.",
            status: 200,
            user: req.user,
            cookies: req.cookies
        });;
      });
    })(req, res, next);
})

// FACEBOOK AUTH --------------------------------------------------------------
router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: `${CLIENT_URL}`,
    failureRedirect: '/auth/login/failed'
}))

// LOGOUT ---------------------------------------------------------------------
router.get("/logout", (req, res) => {
    console.log('got to logout route')
    req.logout();
    res.redirect(`${CLIENT_URL}`);
});

// AUTH RESPONSES
router.get("/login/success", (req, res) => {
    console.log('got to login route')
    if (req.user) {
        res.json({
            message: "User has successfully authenticated.",
            status: 200,
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    console.log('getting to login failed')
    res.json({
        message: "User failed to authenticate."
    });
});


module.exports = router;