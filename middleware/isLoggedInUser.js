require('dotenv').config();
let CLIENT_URL = process.env.CLIENT_URL;

module.exports = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(`${CLIENT_URL}`);
    }
}