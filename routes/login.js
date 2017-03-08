var express = require('express');
var router = express.Router();
var users = require('login-mongo');
var db = require('../db/users.js');
var auth = require('../auth/authentication.js');

//Other modules
var escape = require('escape-html');

//Require ID.
var uniqid = require('uniqid');

//Login options
//Setup user connection
var opts = {
    connect: 'mongodb://localhost:27017/bullhacks',
    iterations: 10,  //number of rounds used in generating salt
    collection: 'users',
    sendEmails: false
};

users.config(opts);

router.get('/', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            console.log(data.validated);
            if(data.validated == true){
                return res.redirect('/admin');
            }
        });
    }
    else{
        res.render('pages/login', {title: 'Login', pageName: 'login'});
    }
});

router.post('/sign-in', function(req, res) {
    if(!req.session.users){
        req.session.users = {};
    }
    var userName = escape(req.body.user);
    var pass = escape(req.body.pass);
    users.checkPassword(userName, pass, function(success) {
        if (success) {
            var uID = uniqid();
            req.session.users[userName] = userName;
            res.cookie('uID', uID, {maxAge: 3600 * 1000});
            db.uniqueID(uID, userName, function(i){
                console.log(i.session);
            });
            db.findUser(userName, function(user){
                return res.redirect('/admin');
            })
        }
        else if(!userName || !pass){
            res.redirect('/login');
        }
        else {
            req.session.user[userName] = void 0;
            return res.redirect('/login');
        }
    });
});


module.exports = router;