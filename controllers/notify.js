let router = require('express').Router();
let axios = require('axios');
let isLoggedInUser = require('../middleware/isLoggedInUser');

router.get('/astronauts', isLoggedInUser, async (req, res) => {
    try {
        let astronautsData = await axios.get("http://api.open-notify.org/astros.json");
        res.json(astronautsData.data);
    } catch (error) {
        res.json({ message: `There was an error calling the open notify API for people in space. ${error}` });
    }
})

router.get('/location', isLoggedInUser, async (req, res) => {
    try {
        let locationData = await axios.get("http://api.open-notify.org/iss-now.json");
        res.json( locationData.data );
    } catch (error) {
        res.json({ message: `There was an error calling the open notify API for ISS location. ${error}` });
    }
})

module.exports = router;