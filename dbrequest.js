const UserModel = require('./server/usermodel');

var add = async(ctx, next) => {
    var newUser = new UserModel(ctx.request.body);
    UserModel.findOne({usrName: newUser.usrName}, function(err, usr) {
        if (err) {
            ctx.response.body = {message: 'user name have been used'};
            console.log(`user name ${ctx.request.usrName} have been used`);
        } else {
            usr.save((err, docs) => {
                if(err) {
                    console.log(`failed to saved user ${err}`);
                    ctx.response.status = {message: 'failed when saving'};
                } else {
                    console.log(`successfully saved user ${err}`);
                    ctx.response.body = {message: 'success'};
                }
            });
        }
    });
}

var login = async(ctx, next) => {
    var name = ctx.request.usrName;
    var _pswd = ctx.request.pswd;
    UserModel.findOne({usrName: name, pswd: _pswd}, function(err, usr) {
        if(err) {
            ctx.response.body = {message: 'failed'};
            console.log('failed login');
        } else {
            ctx.response.body = usr;
            console.log('successfully login');
        }
    })
}

var modify = async(ctx, next) => {
    var id;
    UserModel.findOne({usrName: ctx.request.usrName}, function(err, usr){
        id = usr._id;
        UserModel.update({_id:id}, {$set: ctx.request.body}, function(err) {
            if(err) {
                console.log(`modify error ${ctx.request.body}`);
            } else {
                console.log(`update successfully`);
            }
        });
    });
}

module.exports = {
    'POST /db/add': add,
    'DELETE /db/login': login,
    'POST /db/mdf': modify
}
