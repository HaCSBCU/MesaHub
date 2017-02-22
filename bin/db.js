const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mesahub');


let announcementsSchema = mongoose.Schema({
    title: String,
    date: String, //TBchanged to regular datetime
    body: String
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let Announcements = mongoose.model('Announcement', announcementsSchema)

module.exports = {

  getAllAnnouncements: () => {
    Announcements.find(function (err, ann) {
      if (err) return console.error(err);
      return ann
    })
  }

}
