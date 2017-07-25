
/**
 * 用于将route文件夹中的导出的模块响应注册到router上
 */


const fs = require('fs');

function RegisterRouter(router, dir) {
    var _dir = dir || './';
    if (fs.statSync(_dir).isFile()) {
        
    }
}