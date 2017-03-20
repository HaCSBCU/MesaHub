var user = require('../db/users');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    user.credentials(user, pass, function(data){
        return data;
    })
));