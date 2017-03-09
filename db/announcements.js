var mongoose = require('mongoose');

// DATABASE SCHEMA

var Schema = mongoose.Schema;

var announcementSchema = new Schema({
    title: String,
    date: String,
    body: String
});

var announcement = mongoose.model('announcements', announcementSchema);

module.exports.addAnnouncement = (title, date, body, cb) => {
    var newAnnouncement = new announcement({
        title,
        date,
        body
    });

    newAnnouncement.save(function(err){
        if(err) throw err;
        console.log('Announcement added');
        cb();
    });
};

module.exports.getAnnouncements = (cb) => {
    announcement.find({}, function(err, announcementList){
        cb(announcementList);
    });
};
