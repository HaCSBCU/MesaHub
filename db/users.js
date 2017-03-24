var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

console.log(process.env.MONGO_URI);


// DATABASE SCHEMAS

var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
    id: String,
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
        cb(err, record);
    });
};


module.exports.findUserByID = (id, cb) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    users.findOne({_id: new ObjectId(id)}, function(err, record){
        if(err){
            console.log("Error : " + err);
        }
        cb(err, record);
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
            console.log("error in verify id: " + err);
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
        result.save();
        cb(result);
    });
};

module.exports.verifyPassword = (username, password, cb) => {
    users.findOne({name: username}, function(err, result){
        if(err) throw err;
        var data;
        var verified = {
            verified: true,
            result
        };
        var notVerified = {
            verified: false,
            result
        };
        if(result){
            if(result.passhash == password){
                cb(verified);
            }
            else{
                cb(notVerified);
            }
        }
        else{
            cb(notVerified);
        }
    });

};

module.exports.addUser = (name, password, picture, email, cb) => {
    var organiser = new users({
        email: email,
        name: name,
        picture: picture,
        passhash: password
    });
    organiser.save(function(err){
        cb(err, "Done!")
    })
};


module.exports.compareID = (clientID, serverID) => {
    if (clientID == serverID) {
        return true;
    }
    return false;
}

