// Create router instance to handle auth related requests
const router = require('express').Router();

// Require implemented passport strategies
const passport = require('../config/passportConfig');

// Load environmental variables and grab client url
require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;

// LOCAL AUTH -----------------------------------------------------------------

// Logs in default user ("pryon") using local auth strategy
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/auth/login/failed'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json({
                status: "success",
                code: 200,
                message: "Successful Authenticatication",
                user: req.user,
                cookies: req.cookies
            });;
        });
    })(req, res, next);
});

// FACEBOOK AUTH --------------------------------------------------------------

// Logs in authorized facebook users using facebook passport strategy
router.get('/facebook', passport.authenticate('facebook'));

// Redirects the user based on facebook auth status
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: `${CLIENT_URL}`,
    failureRedirect: '/auth/login/failed'
}));

// LOGOUT ---------------------------------------------------------------------

// Logs out the user (ends session)
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`${CLIENT_URL}`);
});

// AUTH RESPONSES

// Logs in user if session is valid, if no session, do nothing (automatic login)
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            status: "success",
            code: 200,
            message: "Successful Authenticatication",
            user: req.user,
            cookies: req.cookies
        });
    } else {
        res.redirect('/auth/login/failed');
    }
});

// Alerts user if not authenticated
router.get("/login/failed", (req, res) => {
    res.json({ status: "error", code: 401, message: "Not Authenticated" });
});

module.exports = router;