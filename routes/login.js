var express = require('express');
var router = express.Router();
var db = require('../db/users.js');
var passport = require('passport');
var auth = require('connect-ensure-login').ensureLoggedIn();

//Other modules
var escape = require('escape-html');

//Require ID.
var uniqid = require('uniqid');


router.get('/', function(req, res, next) {
    if(!req.isAuthenticated()){
        res.render('pages/login', {title: "login", pageName: "admin", verified: false});
    }
    else{
        res.redirect('/admin');
    }


});

router.post('/sign-in',
    passport.authenticate('login', { failureRedirect: '/timeline' }),
    function(req,res){
        res.redirect('/admin');
    });


router.get('/logout', function(req, res){
    delete req.session.passport.user;
    res.clearCookie("uID");
    res.redirect('/')
});


module.exports = router;
