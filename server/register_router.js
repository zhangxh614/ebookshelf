
/**
 * 用于将route文件夹中的导出的模块响应注册到router上
 */


const fs = require('fs');

function RegisterOneFile(router, dir) {
    if (fs.statSync(dir).isFile()) {
        if (!dir.endsWith('.js')) {
            return; 
        }
        modu = require(dir);
        for (key in modu) {
            if(key.startsWith('GET ')) {
                router.get(key.substring(4), modu[key]);
            } else if (key.startsWith('POST ')) {
                router.post(key.substring(5), modu[key]);
            } else if (key.startsWith('PUT ')) {
                router.put(key.substring(4), modu[key]);
            } else if (key.startsWith('DELETE ')) {
                router.delete(key.substring(6), modu[key]);
            } else if (key.startsWith('PATCH ')) {
                router.patch(key.substring(5), modu[key]);
            } else {
                console.log(`error when register router in file: ${dir}`);
            }
            console.log('registered' + key);
        }
    }
}

function RegisterRouter(router, dir) {
    var _dir = __dirname + '/../' + (dir || './');
    var listOfFile = fs.readdirSync(_dir);
    console.info(listOfFile);
    listOfFile.forEach(function(f, index) {
        let url = dir + f;
        if (fs.statSync(url).isFile()) {
            RegisterOneFile(router, _dir + f);
        } else {
            RegisterRouter(router, url);
        }
    });
}

module.exports = RegisterRouter;