// Unauthenticated users are redirected to auth failure route
// Authenticated users continue
module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login/failed');
    } else {
        next();
    }
};