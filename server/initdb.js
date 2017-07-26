
const mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'userdb');

db.on('error', function(error) {
    console.error(`failed to connect database the error info:
                        ${error.message}`);
});

db.once('open', function(){
    console.log(`successfully connected database`);
});

var UserSchema = new mongoose.Schema({
    usrName: String,
    pswd: String,
    age: Number,
    career: String,
    favBook: String
});

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;