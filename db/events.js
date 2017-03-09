var mongoose = require('mongoose');

// DATABASE SCHEMA

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: String,
    location: String,
    time: Number,
    time2: String,
    picture: String
});

var events = mongoose.model('workshops', eventSchema);

module.exports.addEvent = (name, location, time, time2, picture, cb) => {
    // console.log("Name: " + name);
    // console.log("Location: " + location);
    // console.log("Time: " + time);
    // console.log("Time2: " + time2);
    // console.log("Picture: " + picture);
    var newEvent = new events({
        name,
        location,
        time,
        time2,
        picture
    });

    newEvent.save(function(err){
        if(err) throw err;
        cb();
    });
};

module.exports.getEvents = (cb) => {
    events.find({}).sort({time: -1}).exec(function(err, workshopsList){
        if(err) throw err;
        cb(workshopsList);
    });
};
