var mongoose = require('mongoose');

// DATABASE SCHEMA

var Schema = mongoose.Schema;

var workshopSchema = new Schema({
    name: String,
    location: String,
    time: String,
    picture: String
});

var workshops = mongoose.model('workshops', workshopSchema);

module.exports.addWorkshop = (name, location, time, picture, cb) => {
    var newWorkshop = new workshops({
        name,
        location,
        time,
        picture
    });

    newWorkshop.save(function(err){
        if(err) throw err;
        console.log('Workshop created');
        cb();
    });
};
