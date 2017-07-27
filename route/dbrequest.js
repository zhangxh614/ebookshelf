const UserModel = require('../server/usermodel');

function retMsg(str) {
    console.log(JSON.parse('{"msg": "' + str + '"}'));
    return JSON.parse('{"msg": "' + str + '"}');
}

var add = async(ctx, next) => {
    console.log(`request body: add ${JSON.stringify(ctx.request.body)}`);
    var newUser = new UserModel(ctx.request.body);
    console.log(`constructed ${newUser}`);
    await UserModel.findOne({usrName: newUser.usrName}, function(err, usr) {
        if (err) {
            ctx.response.body = retMsg('DB ERROR');
            ctx.response.status = 503;
            console.log(`database error when adding user`);
        } else {
            if (usr) {
                console.log(`user name: ${usr.usrName} have been used`);
                ctx.response.body = retMsg('used');
            } else {
                newUser.save((err, docs) => {
                    if(err) {
                        console.log(`db failed to saved user, error: ${err}`);
                        ctx.response.body = retMsg('dbfailed');
                    } else {
                        console.log(`successfully saved user ${newUser}`);
                        ctx.response.body = retMsg('success');
                    }
                });
            }
            
        }
    });
}

var login = async(ctx, next) => {
    var name = ctx.request.body.usrName;
    var _pswd = ctx.request.body.pswd;
    console.log(`request ${name}, ${_pswd}`);
    await UserModel.findOne({usrName: name, pswd: _pswd}, function(err, usr) {
        if (err) {
            ctx.response.body = retMsg('DB ERROR');
            ctx.response.status = 503;
            console.log(`database error when adding user`);
        } else {
            if(usr) {
                ctx.response.body = retMsg('success');
                console.log('successfully login');
            } else {
                ctx.response.body = retMsg('wrong');
                console.log('login failed');
            }
        }
    })
}

// unimplemented
var modify = async(ctx, next) => {
    ctx.response.body = 'unimplemented method';
    ctx.response.status = 501;
    var id;
    await UserModel.findOne({usrName: ctx.request.usrName}, function(err, usr){
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
    'POST /api/db/add': add,
    'POST /api/db/login': login,
    'POST /api/db/mdf': modify
}
