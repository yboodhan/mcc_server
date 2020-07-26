// Create router instance to handle open notify related requests
const router = require('express').Router();

// Required axios to make API calls to open notify API
const axios = require('axios');

// Require middleware to make sure users have access to routes
const isLoggedInUser = require('../middleware/isLoggedInUser');

// Sends astronaut data (number, names, and craft names)
router.get('/astronauts', isLoggedInUser, async (req, res) => {
    try {
        let astronautsData = await axios.get("http://api.open-notify.org/astros.json");
        res.json({ 
            status: "success",
            code: 200,
            message: "Successully got astronaut data",
            ...astronautsData.data 
        });
    } catch (error) {
        res.json({ 
            status: "error",
            code: 500,
            message: `There was an error calling the open notify API for people in space. ${error}`,
            error: error
        });
    }
});

// Sends ISS location data (latitude and longitude)
router.get('/location', isLoggedInUser, async (req, res) => {
    try {
        let locationData = await axios.get("http://api.open-notify.org/iss-now.json");
        res.json({ 
            status: "success",
            code: 200,
            message: "Successully got ISS location data",
            ...locationData.data 
        });
    } catch (error) {
        res.json({ 
            status: "error",
            code: 500,
            message: `There was an error calling the open notify API for ISS location.`, 
            error: error
        });
    }
});

module.exports = router;