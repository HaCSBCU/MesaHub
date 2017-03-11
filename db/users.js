var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGO_URI);

// DATABASE SCHEMAS

var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
    email: String,
    name: String,
    picture: String,
    passhash: String,
    session: String
});

// Workshops schema

var users = mongoose.model('users', userSchema);

module.exports.findUser = (user, cb) => {
    users.findOne({name: user}, function(err, record){
        if(err){
            console.log(err);
        }
        cb(record);
    });
};

module.exports.findUserByID = (id, cb) => {
    users.findOne({session: id}, function(err, record){
        if(err){
            console.log(err);
        }
        cb(record);
    });
};

module.exports.uniqueID = (id, user, cb) => {
    users.findOne({name: user}, function(err, record){
        record.session = id;
        record.save(function(err, updatedRecord){
            if(err) throw err;
            cb(updatedRecord);
        });

    });
};

module.exports.verifyID = (id, cb) => {
    users.findOne({session: id}, function(err, result){
        if(err || result == null){
            console.log("error verify id: " + err);
            return err;
        }
        cb(result);
    });

};

module.exports.addPicture = (email, path, cb) => {
    users.findOne({email: email}, function(err, result){
        if(err || result == null){
            console.log("error: " + err);
            return err;
        }
        result.picture = path;
        result.save();
        cb(result);
    });
};

module.exports.logout = (id, cb) => {
    users.findOne({session: id}, function(err, result){
        if(err || result == null){
            console.log("error: " + err);
            return err;
        }
        delete result["session"];
        console.log(result);
        result.save();
        cb(result);
    });
};

module.exports.compareID = (clientID, serverID) => {
  if(clientID == serverID){
      return true;
  }
  return false;
};
