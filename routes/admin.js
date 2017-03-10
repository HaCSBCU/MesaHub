var express = require('express');
var router = express.Router();
var users = require('login-mongo');
var auth = require('../auth/authentication.js');
var userDB = require('../db/users.js');
var multer = require('multer');
var csvImport = require('../scripts/csvconversion')

//Other modules
var escape = require('escape-html');

//Other Config

var opts = {
    connect: 'mongodb://localhost:27017/bullhacks',
    iterations: 10,  //number of rounds used in generating salt
    collection: 'users',
    sendEmails: false
};

users.config(opts);

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
  var storage = multer.memoryStorage()
  var upload = multer({ storage: storage,
    onFileUploadComplete: function (file) {
console.log(file.fieldname + ' uploaded to ' + file.path)
}}).single('csv')

  upload(req, res, function (err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    console.log(req.file)
    csvImport.processFile(req.file.buffer)
      .then( (data)=>{
        console.log(data)





      })
      .catch( (err)=>{console.log(err)})
    res.end("File is uploaded");
  })


});


// EVENTS

router.get('/event', function(req, res){
    var id = req.cookies.uID;
    if(id){
        auth.verifySession(id, function(data){
            if(data.validated == true){
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
        var filePath = '/img/workshops/' + fileName.toString();
        console.log("Time A: " + timeA);
        console.log("TimeB: " + timeB);
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
            if(data.validated == true){
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
        users.add(email, name, password, function(err, success){
            if(err) throw err;
            if(success){
                userDB.addPicture(email, filePath, function(data){
                    console.log("File at: " + data.picture);
                    res.send("Done!");
                })
            }
        });

    });
});



module.exports = router;
