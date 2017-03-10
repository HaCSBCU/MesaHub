const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// DATABASE SCHEMA

const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    university: String,
    phone: String,
    checkedin: Boolean,
    textingOptOut: Boolean
});

const Attendee = mongoose.model('attendees', attendeeSchema)


function add(name, surname, email, university, phone) {
  let checkedin, textingOptOut = false
  let newAttendee = new Attendee({name, surname, email, university, phone, checkedin, textingOptOut})
  console.log('things!')

  return newAttendee.save((err)=>{
      if(err) return reject(err)
    })
}


function addMany(manyObjects){
  Attendee.collection.insert(manyObjects, onInsert);

  function onInsert(err, docs) {
      if (err) {
          return error
      } else {
          console.log(docs.length + ' potatoes were successfully stored.');
      }
  }
}


function getAll () {
  new Promise(function(resolve, reject) {
    Attendee.find({}).exec(function(err, workshopsList){
        if(err) return reject(err)
        resolve(workshopsList)
    })
  });
}

module.exports = {
  getAll: getAll,
  add: add,
  addMany: addMany
}
