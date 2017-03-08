var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var users = require('login-mongo');

var db = require('./db/users.js');
var auth = require('./auth/authentication.js');

//Other modules
var escape = require('escape-html');

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

app.use(session({
  secret: "some secret key",
  saveUninitialized: true, // (default: true)
  resave: true // (default: true)
}));

app.use(express.static(path.join(__dirname, 'public')));


//Setup user connection
var opts = {
  connect: 'mongodb://localhost:27017/bullhacks',
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
  var id = req.cookies.uID;
  if(id){
    db.verifyID(id, function(user){
      if(user == undefined){
        res.render('pages/login', {title: 'Login', pageName: 'login'});
      }
      console.log(user);
      res.render('pages/admin-dashboard', {title: 'Admin Dashboard', pageName: 'admin', name: user.name, picture: null});
    });
  }
  else{
    console.log('NO ID');
    res.render('pages/login', {title: 'Login', pageName: 'login'});
  }
});

app.post('/login', function(req, res) {
  console.log('SUBMIT');
  if(!req.session.users){
    req.session.users = {};
  }
  var userName = escape(req.body.user);
  var pass = escape(req.body.pass);
  users.checkPassword(userName, pass, function(success) {
    if (success) {
      var uID = uniqid();
      req.session.users[userName] = userName;
      res.cookie('uID', uID, {maxAge: 3600 * 1000});
      db.uniqueID(uID, userName, function(i){
        console.log(i.session);
      });
      db.findUser(userName, function(user){
        return res.render('pages/admin-dashboard', {title: 'Admin Dashboard', pageName: 'admin', name: user.name, picture: null});
      })
    }
    else if(!userName || pass){
      res.redirect('/');
    }
    else {
      req.session.user[userName] = void 0;
      return res.redirect('/login');
    }
  });
});

// LOGGED IN USERS

app.get('/admin/send-text', function(req, res){
  var id = req.cookies.uID;
  auth.verifySession(id, function(data){
    console.log(data);
    if(data.validated == true){
      res.render('pages/send-text', {title: 'Admin Dashboard', pageName: 'admin'});
    }
    else{
      res.redirect('/login');
    }
  });
});


// ADMIN DASHBOARD REQUESTS
app.post('/admin/send-text-request', function(req, res){
  var id = req.cookies.uID;
  auth.verifySession(id, function(data){
    console.log(data.validated);
    if(data.validated == true){
      console.log(escape(req.body.message));
      //Call text system from here.
      res.send('Congrats!');
    }
  });
  res.status(500).send('You must be authenticated in order to send a message.')
});


//API AUTH TESTING
app.get('/test', function(req, res){
  res.send(req.session.count.toString() + "<br>" + req.session.alex);
});

app.get('/get-user', function(req, res){
  db.findUser('alex', function(record){
    res.send("User record: " + record);
  })
});

app.get('/id', function(req, res){
  db.verifyID('123xm49iwizynyovm', function(user){
    console.log(user);
    res.send(user)
  })
});

//Workshops
app.get('/workshops', function(req, res){
  res.sendFile(path.join(__dirname, '/views/workshops.html'));
});

app.get('/workshops-list', function(req, res){
  var workshop = require('./db/workshops.js');
  workshop.getWorkshops(function(data){
    console.log(data);
    res.send(data);
  })
});

app.post('/create-workshop', function(req, res){
  var workshop = require('./db/workshops.js');
  var name = escape(req.body.name);
  var location = escape(req.body.location);
  var time = escape(req.body.time);
  var picture = escape(req.body.picture);
  workshop.addWorkshop(name, location, time, picture, function(){
    console.log('Callback received');
    res.send("Workshop added!");
  });
});




module.exports = app;
