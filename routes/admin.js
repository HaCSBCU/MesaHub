var express = require('express');
var router = express.Router();
var auth = require('../auth/authentication.js');
var multer = require('multer');

//Other modules
var escape = require('escape-html');

router.get('/', function(req, res){
    var user = {
        name: 'Alex'
    };
    res.render('pages/admin-dashboard', {title: 'Admin Dashboard', pageName: 'admin', name: user.name, picture: null});
});


// EVENTS

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

router.get('/get-events', function(req, res){
    var events = require('../db/events.js');
    events.getEvents(function(data){
        res.send(data);
    })
});

// Handle file uploads



router.post('/create-event', function(req, res){

    var fileName;
    //File uploaded
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/img/workshops');
        },
        filename: function (req, file, callback) {
            fileName = Date.now() + file.originalname;
            callback(null,fileName);
        }
    });

    var upload = multer({ storage : storage}).single('upl');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var events = require('../db/events.js');
        var name = escape(req.body.name);
        var location = escape(req.body.location);
        var time = escape(req.body.time);
        var timeA;
        var timeB;
        if(time.split(":").length > 1){
            timeA = time.split(":")[0];
            timeB = time.split(":")[1];
        }
        else{
            timeA = time;
            timeB = "";
        }
        var filePath = '/img/workshops/' + fileName.toString();
        events.addEvent(name, location, parseInt(timeA), timeB, filePath, function(){
            res.send("Workshop added!");
        });
    });
});

// ANNOUNCEMENTS

router.get('/announcement', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated == true){
                res.render('pages/create-announcement', {title: 'Create Announcement', pageName: 'create-announcement'});
            }
            else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
});

router.get('/get-announcements', function(req, res){
    var announcement = require('../db/announcements.js');
    announcement.getAnnouncements(function(data){
        res.send(data);
    })
});

router.post('/create-announcement', function(req, res){
    var announcements = require('../db/announcements.js');
    var title = escape(req.body.title);
    var body = escape(req.body.body);
    var date = new Date();
    date.toString().split(" ").splice(1,4);
    announcements.addAnnouncement(title, date, body, function(){
        console.log('Callback received');
        res.send("Workshop added!");
    });
});

// TEXT SYSTEM

router.get('/send-text', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
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