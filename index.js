const express = require('express');
const app = express();
require('dotenv').config();

const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up passport + session
app.use(
    cookieSession({
      name: "session",
      keys: [process.env.SECRET_KEY],
      maxAge: 24 * 60 * 60 * 100 // 24 hours
    })
);
app.use(cookieParser());

app.use(session({ secret: process.env.SECRET_KEY, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
let isLoggedInUser = require('./middleware/isLoggedInUser');

// Set up CORS to accept client requests
app.use(
    cors({
        origin: "https://localhost:3001",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
);

// Import controllers routes
app.use('/auth', require('./controllers/auth'));
app.use('/', require('./controllers/notify'));

app.get("/", isLoggedInUser, (req, res) => {
    res.json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
});

app.get('*', (req, res) => {
    res.send({
        status: "error",
        message: "Request is invalid.",
        code: 400
    })
})

app.listen(3000, () => {
    console.log('🏃🏽‍♂️ The Pryon MCC server is up and running!')
})

