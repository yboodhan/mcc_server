// Import passport and relevant strategies
let passport = require('passport');
let FacebookStategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;

// Require .env variables (access using process.env)
require('dotenv').config();

// Require file system to use as temporary db
let fs = require('fs');

// HELPER FUNCTIONS (for finding/creating user) -------------------------------

// Finds a user in user.json file using user id (returns user or null)
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

// Finds a user in user.json file using username (returns user or null) - local auth
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

// Verifies the passport for a user (local auth)
function verifyPassword(user, password) {
    return user.password == password;
}

// Creates a new user and adds to user.json file (returns new user)
function createNewUser(id, firstName, lastName, email) {
    let allUsers = fs.readFileSync('./config/user.json');
    allUsers = JSON.parse(allUsers);

    let newUser = {
        "id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
    };

    allUsers.push(newUser);
    fs.writeFileSync('./config/user.json', JSON.stringify(allUsers));

    return newUser;
}

// Serializer user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
    let user = findUserById(id);
    if (!user) { return done(null, false); }
    return done(null, user);
});

// PASSPORT AUTH --------------------------------------------------------------

// Logs in default user ("pryon") - local auth
passport.use(new LocalStrategy(
    async function (username, password, done) {

        // Find a user with the username
        let user = await findUserByUsername(username);

        // If user not found
        if (!user) { done(null, false); }

        // If user is found, check password
        if (user) {
            let verfiedUser = await verifyPassword(user, password);
            if (!verfiedUser) {
                done(null, false);
            } else {
                done(null, user);
            }
        }
    }
));

// Logs in verified users through facebook
passport.use(new FacebookStategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'name', 'email']
}, async (accessToken, refreshToken, profile, done) => {

    // Find user if they exist
    const currentUser = await findUserById(profile._json.id);

    // If the user is new, add them
    if (!currentUser) {

        const newUser = await createNewUser(profile._json.id, profile._json.first_name, profile._json.last_name, profile._json.email);

        if (newUser) { done(null, newUser); } 
        else { done(null, false); }

    } else {
        done(null, currentUser);
    }
}));

module.exports = passport;