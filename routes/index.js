var express = require('express');
var router = express.Router();
var passport = require('passport');
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

router.get('/custom-page', function(req, res){
    res.render('pages/custom-page', {title: "Custom Page", pageName: "index", verified: false})
});

////////////////////////
// PASSPORT TESTS END //
///////////////////////

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