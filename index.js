// Require express and declare app object
const express = require('express');
const app = express();

// Load environmental variables from the .env file (access using process.env)
require('dotenv').config();

// Require cookie-based session middleware for client cookie (no databse required)
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

// Require authentication middleware
const passport = require("passport");

// Require CORS (cross-origin resource sharing) enabling middleware
const cors = require('cors');

// Require body parsing middleware for incoming body (access body using req.body)
const bodyParser = require('body-parser');

// Set up body parser to parse application/json body
app.use(bodyParser.json());

// Set up signed cookie session to last 1 day (1000ms/1s * 60s/1min * 60min/1hr * 24hrs/1day)
app.use(
    cookieSession({
        name: "session",
        keys: [process.env.SECRET_KEY],
        maxAge: 24 * 60 * 60 * 1000
    })
);

// Parse cookie header (access using req.cookies)
app.use(cookieParser());

// Initialize passport and it's strategies and sessions for persistent login
app.use(passport.initialize());
app.use(passport.session());

// Set up CORS options for accept client requests and accept browser cookies
app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
);

// Import controllers routes for auth and notify (astronaut and iss location APIs)
app.use('/auth', require('./controllers/auth'));
app.use('/', require('./controllers/notify'));

// Deal with requests to routes that do not exist (bad requests)
app.get('*', (req, res) => {
    res.json({
        status: "error",
        code: 400,
        message: "Bad Request"
    })
});

// Run server instance
app.listen(3000, () => {
    console.log('🛰  👩🏾‍🚀 The Pryon MCC server is up and running! 🚀 ☄️')
});

