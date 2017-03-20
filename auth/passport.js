var user = require('../db/users');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (user, pass, done) => {
        user.findUser(user).then(function(err, data){
            if(err) throw err;
            if(!data){
                return done(null, false, {message: "User not found"});
            }
            //Use bycrypt
            if(pass != data.password){
                return done(null, false, {message: "Incorrect password"})
            }
        });
    }
));