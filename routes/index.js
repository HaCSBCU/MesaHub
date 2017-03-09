var express = require('express');
var router = express.Router();
// var utilities = require('../libs/middleware/utilities.js');
// var config = require('../config/config.js');

router.get('/', function(req, res){
  if(!req.session.count){
    req.session.count = 1;
  } else{
    req.session.count++;
  }
  res.render('pages/index', {title: 'Home', pageName: 'index', verified: false});
});


router.get('/set', function(req, res){
  req.session.name = "Alex";
  res.redirect('/test');
});

module.exports = router;