var express = require('express');
var router = express.Router();
// var users = require('login-mongo');
var db = require('../db/users.js');
var auth = require('../auth/authentication.js');

//Other modules
var escape = require('escape-html');

//Require ID.
var uniqid = require('uniqid');

router.get('/', function(req, res){
    res.render('pages/register', {title: 'Register', pageName: 'register', verified: false});
});






module.exports = router;