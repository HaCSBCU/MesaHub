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
var auth = require('./auth/passport.js');

var db = require('./db/users.js');
var auth = require('./auth/authentication.js');

//Other modules
var escape = require('escape-html');
var multer = require('multer');


//Require ID.
var uniqid = require('uniqid');

var app = express();

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
app.use(session({
    secret: "test",
    saveUninitialized: true, // (default: true)
    resave: true // (default: true)
}));

app.use(passport.initialize());
app.use(passport.session());




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


module.exports = app;
