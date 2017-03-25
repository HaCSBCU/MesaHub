var userDb = require('../db/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var hash = require('bcrypt');

passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log('We got here!');
        // check in mongo if a user with username exists or not
        userDb.findUser(username, function(err, user){
            if(err) throw err;
            // In case of any error, return using the done method
            if (err)
                return done(err);
            // Username does not exist, log error & redirect back
            if (!user){
                console.log('User Not Found with username '+username);
                return done(null, false);
            }
            // User exists but wrong password, log the error
            if (password != user.passhash){
                console.log('Invalid Password');
                return done(null, false);
            }
            // User and password both match, return user from
            // done method which will be treated like success
            console.log("logged in");
            return done(null, user);
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    userDb.findUserByID(id, function(err, user) {
        done(null, user);
    });
});