var express = require('express');
var router = express.Router();
var db = require('../db/users.js');
var passport = require('passport');
var auth = require('connect-ensure-login').ensureLoggedIn();

//Other modules
var escape = require('escape-html');

//Require ID.
var uniqid = require('uniqid');

// CONFIG
const config = require('../config/config.js');


router.get('/', function(req, res, next) {
    if(!req.isAuthenticated()){
        res.render(config.pages.login, {title: config.pageNames.login, pageName: "admin", verified: false});
    }
    else{
        res.redirect(config.routes.admin);
    }


});

router.post(config.routes.signIn,
    passport.authenticate('login', { failureRedirect: config.pageNames.login }),
    function(req,res){
        console.log("CALLED")
        res.redirect(config.routes.admin);
    });


router.get(config.routes.logout, function(req, res){
    console.log(req);
    delete req.session.passport.user;
    res.clearCookie("uID");
    res.clearCookie("connect.sid");
    res.redirect('/')
});


module.exports = router;
