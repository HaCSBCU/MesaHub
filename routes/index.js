var express = require('express');
var router = express.Router();
var passport = require('passport');
// var utilities = require('../libs/middleware/utilities.js');
// var config = require('../config/config.js');
const sql = require('../scripts/db/query')
const unescape = require('unescape')


//Send locals to all router instances
router.use(function (req, res, next) {
  let queryString = `select * 
  from hackathon_config 
  inner join hackathon on hackathon.hackathonid=hackathon_config.hackathonid
  where hackathon.subdomain='${req.subdomains[0]}'`

  res.locals.hackathon = {name: 'Not a valid Hackathon'}
  sql.select(queryString)
  .then((query)=>{
       res.locals.hackathon = query[0]
       res.locals.hackathon.timeline = unescape(res.locals.hackathon.timeline)
       next()
  }).catch((e)=>{
    console.log(e)
    res.locals.hackathon.name = 'Name missconfigured'
    next()
  })
  
})

router.use(function (req, res, next) {
  const pages = require('../scripts/db/pages')
  pages.getAll(res.locals.hackathon.hackathonid).then((data)=>{
    res.locals.pages = data
    next()
  }).catch((e)=>{
    console.log(e)
    next()
  })
  
})

var db = require('../db/users.js');

router.get('/', function(req, res){
  res.render('pages/index', {title: 'Home', pageName: 'index', verified: false});
});

router.get('/timeline', function(req, res){
  res.render('pages/timeline', {title: 'Timeline', pageName: 'timeline', verified: false});
});

//////////////////////////
// PASSPORT TESTS START //
/////////////////////////

router.get('/test-login', function(req, res){
      res.render('pages/login-test', {title: 'Login', pageName: 'login', verified: false});
});

router.post('/auth-login',
    passport.authenticate('login', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/post-login');
    });

router.get('/post-login',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        console.log(req.session);
        db.findUserByID(req.session.passport.user, function(err, record){
            res.send(record.name);
        });

    }
);



////////////////////////
// PASSPORT TESTS END //
///////////////////////

router.get('/page/:id', function(req, res){
  const pages = require('../scripts/db/pages')
  pages.getPage(parseInt(req.params.id)).then((data)=>{
    res.render('pages/custom-page', {title: "Custom Page", pageName: "index", pageContent: data, verified: false})
  }).catch((e)=>{
    console.log(e)
  })
    
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