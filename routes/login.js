var express = require('express');
var router = express.Router();
var db = require('../db/users.js');
var auth = require('../auth/authentication.js');

//Other modules
var escape = require('escape-html');

//Require ID.
var uniqid = require('uniqid');


router.get('/', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
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
    var userName = escape(req.body.name);
    var pass = escape(req.body.pass);
    db.verifyPassword(userName, pass, function(data){
        if(data.verified){
            var uID = uniqid();
            req.session.users[userName] = userName;
            res.cookie('uID', uID, {maxAge: 3600 * 1000});
            db.uniqueID(uID, userName, function(i){
                console.log(i.session);
            });
            db.findUser(userName, function(user){
                res.send({
                    redirect: '/admin'
                })
            })
        }
        else if(!userName || !pass){
            res.redirect('/login');
        }
        else {
            // req.session.user[userName] = void 0;
            res.status(500).send("Incorrect username / password. Please try again.");
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
