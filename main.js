var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db/users.js');
var auth = require('./auth/authentication.js');

//Other modules
var escape = require('escape-html');
var multer = require('multer');


//Require ID.
var uniqid = require('uniqid');

var app = express();
var RedisStore = require('connect-redis')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Passport

var expressSession = require('express-session');
app.use(session({secret: "test", saveUninitialized: true, resave: true,}));


//Init passport
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // console.log(req);
        // check in mongo if a user with username exists or not
        db.findUser(username, function(err, user){
            if (err){
                return done(err);
            }
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
    console.log("deserialize");
    db.findUserByID(id, function(err, user) {
        if(err){
            console.log(err)
        }
        done(null, user);
    });


});


app.use(express.static(path.join(__dirname, 'public')));


// API ROUTES
//Homepage
app.use('/', require('./routes/index.js'));

//Login
app.use('/login', require('./routes/login.js'));

//Create user
app.use('/register', require('./routes/register.js'));

//Admin-backend
app.use('/admin', require('./routes/admin.js'));

//Routes test

app.get('/test', function(req, res){
    console.log(req.session);
    res.render('pages/test', {title: 'Test', pageName: 'test'});
});

app.post('/get-user', function(req, res){
   var user = req.body.user;
    db.findUser(user, function(record){
        console.log(record);
        res.send("Found")
    })
});



module.exports = app;
