const express = require('express');
const router = express.Router();
const auth = require('../auth/authentication.js');
const userDB = require('../db/users.js');
const attendeeDB = require('../db/attendees')
const multer = require('multer');
<<<<<<< HEAD
const csvImport = require('../scripts/csvconversion')
const text = require('../scripts/texting')
const aws = require('../scripts/s3')
=======
const csvImport = require('../scripts/csvconversion');
const text = require('../scripts/texting');
const aws = require('../scripts/s3');
>>>>>>> 4c09311a69c90796a4bfb49b7c2dae00653ac0ea

//Other modules
const escape = require('escape-html');

//Other Config

//Default route

router.get('/', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            data = data.user;
            console.log(data.name);
            console.log(data.picture);
            res.render('pages/admin-dashboard', {title: 'Admin Test', pageName: 'admin', name: data.name, picture: data.picture, verified: true});
        });
    }
    else{
        res.redirect('/');
    }

});

// ATTENDEES

router.post('/upload-csv', function(req, res){
    console.log("Upload");
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(user){
            if(user.verified === true){
                var storage = multer.memoryStorage()
                var upload = multer({ storage: storage,
                    onFileUploadComplete: function (file) {
                        console.log(file.fieldname + ' uploaded to ' + file.path)
                    }}).single('csv');

                upload(req, res, function (err) {
                    if(err) {
                        return res.end("Error uploading file.");
                    }
                    console.log(req.file)
                    csvImport.processFile(req.file.buffer)
                        .then( (data)=>{
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

router.get('/event', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated === true){
                res.render('pages/create-event', {title: 'Create Event', pageName: 'admin', verified: true});
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

  var storage = multer.memoryStorage()
  var upload = multer({ storage: storage}).single('upl');




    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var events = require('../db/events.js');
        var name = escape(req.body.name);
        var location = escape(req.body.location);
        var time = escape(req.body.time);
        var timeA;
        var timeB = "";
        if(time.split(":").length > 1){
            timeA = time.split(":")[0];
            timeB = time.split(":")[1];
            console.log("Time A: " + parseInt(timeA));
            console.log(timeB);
        }
        else{
            timeA = time;
            timeB = "";
        }
        aws.upload(req.file.buffer).then((url) => {
            var filePath = url
            console.log("Time A: " + timeA);
            console.log("TimeB: " + timeB);
            events.addEvent(name, location, parseInt(timeA), timeB, filePath, function(){
                res.send("Workshop added!");
            });
          }).catch((err)=>{
            console.log(err)
          })


    });
});

// ANNOUNCEMENTS

router.get('/announcement', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated == true){
                res.render('pages/create-announcement', {title: 'Create Announcement', pageName: 'admin', verified: true});
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
            if(data.validated === true){
                res.render('pages/send-text', {title: 'Admin Dashboard', pageName: 'admin', verified: true});
            }
            else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
});


function getAttendeesNumbers() {

}

router.post('/send-text-request', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            console.log(data.validated);
            if(data.validated === true){
                console.log(escape(req.body.message));


                attendeeDB.getAll().then((attendee)=>{
                  let phones = attendee.map((x)=>{
                    return x.phone
                  })

                  text.sendMany(phones, req.body.message)

                }).catch((err)=>{
                  console.log('error retrieving attendees from db ' + err)
                })




                //Call text system from here.
                res.send('Congrats!');
            }
        });
    }
    else{
        res.status(500).send('You must be authenticated in order to send a message.')
    }
});

// CREATE USER

router.get('/create-user', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated == true){
                res.render('pages/create-user', {title: 'create-user', pageName: 'admin', verified: true});
            }
            else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
});

router.post('/create-user', function(req, res){

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

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var events = require('../db/events.js');
        var name = escape(req.body.name);
        var email = escape(req.body.email);
        var password = escape(req.body.password);

        var filePath = '/img/users/' + fileName.toString();
        // users.add(email, name, password, function(err, success){
        //     if(err) throw err;
        //     if(success){
        //         userDB.addPicture(email, filePath, function(data){
        //             console.log("File at: " + data.picture);
        //             res.send("Done!");
        //         })
        //     }
        // });
        //Add new user


    });
});



module.exports = router;
