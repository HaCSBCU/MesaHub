const express = require('express');
const router = express.Router();
// const auth = require('../auth/authentication.js');
const db = require('../db/users.js');
const attendeeDB = require('../db/attendees')
const multer = require('multer');
const csvImport = require('../scripts/csvconversion');
const text = require('../scripts/texting');
const aws = require('../scripts/s3');
var passport = require("passport");
const moment = require('moment')

//Other modules
const escape = require('escape-html');
var auth = require('connect-ensure-login').ensureLoggedIn();

//Other Config

//Default route

router.get('/', auth, function(req, res){
    db.findUserByID(req.session.passport.user, function(err, user){
        if(err) throw err;
        console.log('user');
        res.render('pages/admin-dashboard', {title: "Dashboard", pageName: "admin", verified: "true", name: user.name, picture: user.picture});
    })

});

// ATTENDEES

router.post('/upload-csv', function(req, res){
    console.log("Upload");
    var id = req.cookies.uID;
    console.log(id);
    if(id){
        auth.verifySession(id, function(user){
          console.log("User:");
          console.log(user.user.session);
            if(user.user.session === id){
                var storage = multer.memoryStorage()
                var upload = multer({ storage: storage,
                    onFileUploadComplete: function (file) {
                        console.log(file.fieldname + ' uploaded to ' + file.path)
                    }}).single('csv');

                upload(req, res, function (err) {
                    if(err) {
                        return res.end("Error uploading file.");
                    }
                    console.log(req.file);
                    csvImport.processFile(req.file.buffer)
                        .then( (data) => {
                            console.log(data)


                            var debugNum = 0
                            data.forEach(item => {
                                debugNum += 1
                                attendeeDB.add(
                                    item[1],
                                    item[2],
                                    item[4],
                                    item[3],
                                    item[6]
                                ).then(()=>{
                                    console.log(item[0] + ' added successfully ' + debugNum)
                                }).catch((err)=>{
                                    console.log(err)
                                })

                            })
                        })
                        .catch( (err)=>{console.log(err)})
                    res.end("File is uploaded");
                })
            }
            else{
                res.redirect('/login')
            }
        });
    }
    else{
        res.redirect('/')
    }

});


// EVENTS


router.get('/event', auth, function(req, res){
    res.render('pages/create-event', {title: 'Create Event', pageName: 'admin', verified: true});
});

router.get('/get-events', function(req, res){
    var events = require('../scripts/db/events.js');
    events.getEvents(res.locals.hackathon.hackathonid).then((data)=>{
        let formattedData = data.map((x)=>{
            let time = moment(x.timestamp).format('dddd, h:mm a')
            return {name: x.title, picture: x.icon, location: x.location, time: time}
        })
        res.send(formattedData)
    }).catch((e)=>{
        console.log(e)
    })
});

// Handle file uploads



router.post('/create-event', function(req, res){

  var storage = multer.memoryStorage()
  var upload = multer({ storage: storage}).single('upl');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var events = require('../scripts/db/events.js');
        var name = escape(req.body.name)
        var location = escape(req.body.location)
        var time = req.body.time

        aws.upload(req.file.buffer).then((url) => {
            var filePath = url

            events.addEvent(1, res.locals.hackathon.hackathonid, name, location, time, filePath ).then(()=>{
                res.send('Event Added')
            }).catch()
          }).catch((err)=>{
            console.log(err)
          })


    });
});

// ANNOUNCEMENTS

router.get('/announcement', auth, function(req, res){
    res.render('pages/create-announcement', {title: 'Create Announcement', pageName: 'admin', verified: true});
});

router.get('/get-announcements', function(req, res){
    var announcement = require('../scripts/db/announcements.js');
    announcement.getAnnouncements(res.locals.hackathon.hackathonid).then((data)=>{
        let formattedData = data.map((x)=>{
            let time = moment(x.timestamp).format('dddd, h:mm a')
            return {title: x.title, body: x.body, date: time}
        })
        res.send(formattedData)
    }).catch()
});

router.post('/create-announcement', function(req, res){
    var announcements = require('../scripts/db/announcements.js');
    var title = req.body.title;
    var body = req.body.body;

    announcements.addAnnouncement(res.locals.hackathon.hackathonid, 1, title, body).then(()=>{
        res.send('Worshop added!')
    }).catch((e)=>{
        console.log(e)
    })
});

// TEXT SYSTEM

router.get('/send-text', auth, function(req, res){
    res.render('pages/send-text', {title: 'Admin Dashboard', pageName: 'admin', verified: true});
});


router.post('/send-text-request', function(req, res, next) {
    if(req.isAuthenticated()){
        attendeeDB.getAll().then((attendee)=>{
            let phones = attendee.map((x)=>{
                return x.phone
            });

            text.sendMany(phones, req.body.message)

        }).catch((err)=>{
            console.log('error retrieving attendees from db ' + err)
        });

        //Call text system from here.
        console.log(req.body.message);
        res.send('Congrats!');
    }
    else{
       res.status(500).send("Not authenticated");
    }
});


// PAGES


router.get('/page', auth, function(req, res){
    res.render('pages/create-page', {title: 'Create Event', pageName: 'admin', verified: true});
});

router.post('/create-page', function(req, res){
const pages = require('../scripts/db/pages')
  var storage = multer.memoryStorage()
  var upload = multer({ storage: storage}).single('upl');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var pages = require('../scripts/db/pages.js');
        var title = escape(req.body.title)
        var html = escape(req.body.html)
        var arrangement = parseInt(req.body.arrangement)

        aws.upload(req.file.buffer).then((url) => {
            var filePath = url

            pages.add(res.locals.hackathon.hackathonid, title, filePath, html, arrangement).then(()=>{
                res.send('Event Added')
            }).catch((err)=>{
                console.log(err)
                res.send('an error occured')
            })
          }).catch((err)=>{
            console.log(err)
          })


    });
});


// CREATE USER

router.get('/create-user', auth, function(req, res){
    res.render('pages/create-user', {title: 'create-user', pageName: 'admin', verified: true});
});

router.post('/create-user', auth, function(req, res){

    var fileName;
    //File uploaded
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/img/users');
        },
        filename: function (req, file, callback) {
            fileName = Date.now() + file.originalname;
            callback(null,fileName);
        }
    });

    var upload = multer({ storage : storage}).single('upl');

    var users = require('../db/users');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var events = require('../db/events.js');
        var name = escape(req.body.name);
        var email = escape(req.body.email);
        var password = escape(req.body.password);

        var filePath = '/img/users/' + fileName.toString();
        users.addUser(name, password, filePath, email, function(err, message){
            if(err) throw err;
            console.log("Message");
        });
        // users.add(email, name, password, function(err, success){
        //     if(err) throw err;
        //     if(success){
        //         userDB.addPicture(email, filePath, function(data){
        //             console.log("File at: " + data.picture);
        //             res.send("Done!");
        //         })
        //     }
        // });



    });
});



module.exports = router;
