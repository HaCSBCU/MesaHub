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
    pageName: 'index',
    title: 'Something'
    announcement: [
      {
        title: 'Title 1',
        date: '11th March 20:15',
        body: 'Here is some body text'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      },
      {
        title: 'Title 2',
        date: '11th March 20:17',
        body: 'Here is some body text which is the second item!'
      }
    ],
    workshops: [
      {
        title: "Node JS",
        img: 'alex.jpg',
        location: 'MP242',
        time: "3pm"
      },
      {
        title: "Git",
        img: 'panda.jpg',
        location: 'MP242',
        time: "3pm"
      }
      ,
      {
        title: "Hackathons",
        img: 'joe.jpg',
        location: 'MP242',
        time: "3pm"
      }
      ,
      {
        title: "Something",
        img: 'oliver.jpg',
        location: 'MP242',
        time: "3pm"
      }
    ]
  };
  res.render('pages/index', data);
});


app.listen(8000);

module.exports = app;
