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
  var data = {
    title: 'Something',
    ann: [
      {
        title: 'Title 1',
        date: '11th March 20:15',
        body: 'Here is some body text'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      }
    ]
  };
  res.render('pages/index', data);
});


app.listen(8000);

module.exports = app;
