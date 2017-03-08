var db = require('../db/db.js');

module.exports.verifySession = (clientID, cb) => {
    if(!clientID){
        return {
            validated: false
        };
    }
    db.verifyID(clientID, function(user){
        if(user.session == clientID){
            var data = {
                user: user,
                validated: true
            };
            cb(data);
        }
        else{
            return false;
        }
    });
};