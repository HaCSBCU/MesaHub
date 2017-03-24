var express = require('express');
var router = express.Router();
// var utilities = require('../libs/middleware/utilities.js');
// var config = require('../config/config.js');
const sql = require('../scripts/db/query')


//Send locals to all router instances
router.use(function (req, res, next) {
  let queryString = `select * 
  from hackathon_config 
  inner join hackathon on hackathon.hackathonid=hackathon_config.hackathonid
  where hackathon.subdomain='${req.subdomains[0]}'`

  res.locals.hackathon = {name: 'Not a valid Hackathon'}
  sql.select(queryString)
  .then((query)=>{
    if(query.name !== []){
      console.log(query)
       res.locals.hackathon = query[0]
    }
    next()
  }).catch((e)=>{
    console.log(e)
    res.locals.hackathon.name = 'Name missconfigured'
    next()
  })


  
})


router.get('/', function(req, res){
  if(!req.session.count){
    req.session.count = 1;
  } else{
    req.session.count++;
  }
  res.render('pages/index', {title: 'Home', pageName: 'index', verified: false});
});

router.get('/timeline', function(req, res){
  res.render('pages/timeline', {title: 'Timeline', pageName: 'timeline', verified: false});
});

router.get('/workshops', function(req, res){
  res.render('pages/workshops', {title: 'Timeline', pageName: 'workshops', verified: false});
});

router.get('/feedback', function(req, res){
  res.render('pages/feedback', {title: 'Feedback', pageName: 'feedback', verified: false});
});

router.get('/bullhacks', function(req, res){
  res.render('pages/bullhacks', {title: 'BullHacks', pageName: 'bullhacks', verified: false});
});

router.get('/set', function(req, res){
  req.session.name = "Alex";
  res.redirect('/test');
});

module.exports = router;