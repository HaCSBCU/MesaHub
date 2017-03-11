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
    connect: process.env.MONGO_URI,
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
                res.redirect('/admin');
            }
        });
    }
    else{
        res.render('pages/login', {title: 'Login', pageName: 'admin', verified: false});
    }
});

router.post('/sign-in', function(req, res) {
    if(!req.session.users){
        req.session.users = {};
    }
    console.log(req.body.name);
    console.log(req.body.pass);
    var userName = escape(req.body.name);
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
                console.log("Should of logged in");
                res.send({
                    redirect: '/admin'
                })
            })
        }
        else if(!userName || !pass){
            console.log('No user or password');
            res.redirect('/login');
        }
        else {
            // req.session.user[userName] = void 0;
            console.log("Other");
            res.status(500).send("Incorrect username / password. Please try again.");
            // return res.redirect('/login');
        }
    });
});

router.get('/logout', function(req, res){
    var id = req.cookies.uID;
    db.logout(id, function(data){
        res.clearCookie("uID");
        res.redirect('/')
    })
});


module.exports = router;
