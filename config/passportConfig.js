// Import passport and relevant strategies
require('dotenv').config();
let passport = require('passport');
let FacebookStategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;

// Import the user.json data set using fs (alternative to DB)
let fs = require('fs');

// Helper functions for finding/creating user
function findUserById(id) {
    let allUsers = fs.readFileSync('./config/user.json');
    allUsers = JSON.parse(allUsers);
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id == id) {
            return allUsers[i];
        }
    }
    return null;
};

function findUserByUsername(username) {
    let allUsers = fs.readFileSync('./config/user.json');
    allUsers = JSON.parse(allUsers);
    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].username == username) {
            return allUsers[i];
        }
    }
    return null;
};

function verifyPassword(user, password) {
    return user.password == password;
}

function createNewUser(id, firstName, lastName, facebookEmail) {
    let allUsers = fs.readFileSync('./config/user.json');
    allUsers = JSON.parse(allUsers);

    let newUser = {
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": facebookEmail,
    };

    allUsers.push(newUser);
    fs.writeFileSync('./config/user.json', JSON.stringify(allUsers));

    return newUser;
}

// Local and facebook strategies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('🚫 deserializing')
    let user = findUserById(id);
    console.log(user)
    if (!user) { return done(null, false); }
    return done(null, user);
});

// Local auth
passport.use(new LocalStrategy(
    async function (username, password, done) {

        // Find a user with the username
        let user = await findUserByUsername(username);

        // If user not found
        if (!user) { return done(null, false); }

        // If user is found, check password
        if (user) {
            let verfiedUser = await verifyPassword(user, password);
            if (!verfiedUser) { return done(null, false); }
            return done(null, user);
        }
    }
));

// Facebook auth
passport.use(new FacebookStategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'name', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    console.log('getting into fb')
    console.log(profile)
    // If the user exists, get their info
    const currentUser = await findUserById(profile._json.id);
    console.log('current user:')
    console.log(currentUser)
    // If the user is new, add them
    if (!currentUser) {

        // Create the new user and save to our file
        const newUser = await createNewUser(profile._json.id, profile._json.first_name, profile._json.last_name, profile._json.email);

        console.log('new user')
        console.log(newUser)
        if (newUser) {
            done(null, newUser);
        } else {
            done(null, false);
        }
    } else {
        done(null, currentUser);
    }
}))

module.exports = passport;