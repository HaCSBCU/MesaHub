var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('login-mongo');

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

app.use(session({
  secret: "some secret key",
  saveUninitialized: true, // (default: true)
  resave: true // (default: true)
}));

app.use(express.static(path.join(__dirname, 'public')));


//Setup user connection
var opts = {
  connect: 'mongodb://localhost:27017/user',
  iterations: 10,  //number of rounds used in generating salt
  collection: 'users',
  sendEmails: false
};

users.config(opts);




//API Endpoints


app.get('/', function(req, res){
  if(!req.session.count){
    req.session.count = 1;
  } else{
    req.session.count++;
  }
  console.log(req.session);
  res.render('pages/index', {title: 'Home', pageName: 'index'});
});

app.get('/set', function(req, res){
  req.session.name = "Alex";
  res.redirect('/test');
});



app.get('/user', function(req, res){
  res.sendFile(path.join(__dirname , '/views/index.html'));
});

app.post('/createuser', function(req,res){

  users.add(req.body.email, req.body.user, req.body.pass, function(err, success) {
    return res.end(JSON.stringify({
      error: err,
      success: success
    }));
  });

});

// API AUTH

app.get('/login', function(req, res){
  res.render('pages/login', {title: 'Login', pageName: 'login'});
});

app.post('/login', function(req, res) {
  console.log('SUBMIT');
  if(!req.session.users){
    req.session.users = {};
  }
  users.checkPassword(req.body.user, req.body.pass, function(success) {
    if (success) {
      req.session.users[req.body.user] = req.body.user;
      res.cookie('name', req.body.user);
      return res.render('pages/admin-dashboard', {title: 'Admin Dashboard', pageName: 'admin', name: req.body.user});
    } else {
      req.session.user[req.body.user] = void 0;
      return res.redirect('/login');
    }
  });
});

// LOGGED IN USERS

// app.get('/admin-dashboard', function(req, res){
//   console.log(req.session.user);
//   if(req.session.user != null){
//     res.send("You're an admin");
//   }
// });

//API AUTH TESTING
app.get('/test', function(req, res){
  res.send(req.session.count.toString() + "<br>" + req.session.alex);
});


module.exports = app;
