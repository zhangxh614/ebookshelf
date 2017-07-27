
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var db = mongoose.createConnection('localhost', 'userdb');

db.on('error', function(error) {
    console.error(`failed to connect database the error info:
                        ${error.message}`);
});

db.once('open', function(){
    console.log(`successfully connected database`);
});

var UserSchema = new mongoose.Schema({
    usrName: {
        type: "String",
        required: true
    },
    pswd: {
        type: "String",
        required: true
    },
    age: {
        type: "Number",
        min: 0,
        max: 150
    },
    career: {
        type: "String",
    },
    favBook: {
        type: "String"
    }
});

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;