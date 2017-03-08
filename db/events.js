var mongoose = require('mongoose');

// DATABASE SCHEMA

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: String,
    location: String,
    time: String,
    picture: String
});

var events = mongoose.model('workshops', eventSchema);

module.exports.addEvent = (name, location, time, picture, cb) => {
    var newEvent = new workshops({
        name,
        location,
        time,
        picture
    });

    newEvent.save(function(err){
        if(err) throw err;
        console.log('Workshop created');
        cb();
    });
};

module.exports.getEvents = (cb) => {
  events.findOne({}, function(err, workshopsList){
    cb(workshopsList);
  });
};
