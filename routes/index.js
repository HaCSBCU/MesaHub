var express = require('express');
var router = express.Router();
var passport = require('passport');

const unescape = require('unescape');

// DB
const sql = require('../scripts/db/query');
var db = require('../db/users.js');

// CONFIG
const config = require('../config/config.js');



//Send locals to all router instances
router.use(function (req, res, next) {
  let queryString = `select * 
  from hackathon_config 
  inner join hackathon on hackathon.hackathonid=hackathon_config.hackathonid
  where hackathon.subdomain='${req.subdomains[0]}'`;

  res.locals.hackathon = {name: 'Not a valid Hackathon'};
  sql.select(queryString)
  .then((query)=>{
       res.locals.hackathon = query[0];
       res.locals.hackathon.timeline = unescape(res.locals.hackathon.timeline);
       next()
  }).catch((e)=>{
    console.log(e);
    res.locals.hackathon.name = 'Name missconfigured';
    next()
  })
  
});

router.use(function (req, res, next) {
  const pages = require('../scripts/db/pages');
  pages.getAll(res.locals.hackathon.hackathonid).then((data)=>{
    res.locals.pages = data;
    next()
  }).catch((e)=>{
    console.log(e);
    next()
  })
  
});


// DEFAULT ROUTE
router.get('/', function(req, res){
  res.render(config.pages.index, {title: config.pageNames.index, pageName: 'index', verified: false});
});

// RENDER TIMELINE PAGE
router.get(config.routes.timeline, function(req, res){
  res.render(config.pages.timeline, {title: config.pageNames.timeline, pageName: 'timeline', verified: false});
});

// RENDER CUSTOM PAGE
router.get('/page/:id', function(req, res){
  const pages = require('../scripts/db/pages');
  pages.getPage(parseInt(req.params.id)).then((data)=>{
    res.render('pages/custom-page', {title: config.pageNames.customPage, pageName: "index", pageContent: data, verified: false})
  }).catch((e)=>{
    console.log(e)
  })
    
});


module.exports = router;