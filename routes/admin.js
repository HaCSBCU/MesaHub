var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication.js');

//Other modules
var escape = require('escape-html');

router.get('/', function(req, res){
    var user = {
        name: 'Alex'
    };
    res.render('pages/admin-dashboard', {title: 'Admin Dashboard', pageName: 'admin', name: user.name, picture: null});
});


//Workshops
router.get('/event', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated == true){
                res.render('pages/create-event', {title: 'Create Event', pageName: 'create-event'});
            }
            else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
});

// WORKSHOPS

router.get('/workshops-list', function(req, res){
    var workshop = require('../db/workshops.js');
    workshop.getWorkshops(function(data){
        console.log(data);
        res.send(data);
    })
});

router.post('/create-workshop', function(req, res){
    var workshop = require('../db/workshops.js');
    var name = escape(req.body.name);
    var location = escape(req.body.location);
    var time = escape(req.body.time);
    var picture = escape(req.body.picture);
    workshop.addWorkshop(name, location, time, picture, function(){
        console.log('Callback received');
        res.send("Workshop added!");
    });
});

// TEXT SYSTEM

router.get('/send-text', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            console.log(data);
            if(data.validated == true){
                res.render('pages/send-text', {title: 'Admin Dashboard', pageName: 'admin'});
            }
            else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
});

router.post('/send-text-request', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            console.log(data.validated);
            if(data.validated == true){
                console.log(escape(req.body.message));
                //Call text system from here.
                res.send('Congrats!');
            }
        });
    }
    else{
        res.status(500).send('You must be authenticated in order to send a message.')
    }
});


module.exports = router;