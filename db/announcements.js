var mongoose = require('mongoose');

// DATABASE SCHEMA

var Schema = mongoose.Schema;

var announcementSchema = new Schema({
    title: String,
    body: String
});

var announcement = mongoose.model('announcements', announcementSchema);

module.exports.addAnnouncement = (title, body, cb) => {
    var newAnnouncement = new announcement({
        title,
        body
    });

    newAnnouncement.save(function(err){
        if(err) throw err;
        console.log('Announcement added');
        cb();
    });
};

module.exports.getAnnouncements = (cb) => {
    announcement.findOne({}, function(err, announcementList){
        cb(announcementList);
    });
};
