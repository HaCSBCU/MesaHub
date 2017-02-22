var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

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

app.use(express.static(path.join(__dirname, 'public')));

//API Endpoints

// app.use('/', index);

app.get('/', function(req,res){
  res.render('pages/index', {title: 'Home', pageName: 'index'});
});

app.get('/login', function(re, res){
  res.render('pages/login', {title: 'Login', pageName: 'login'});
});

app.get('/vue', function(req, res){
  res.sendFile(path.join(__dirname , '/views/index.html'));
});


app.listen(8000);

module.exports = app;
