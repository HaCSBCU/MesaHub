var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user');

var Schema = mongoose.Schema;

//User Schema
//Schema

var userSchema = new Schema({
    userName: String,
    name: String,

});