/**
 * 用于响应html加载随后发出的加载css, js请求
 */

const fs = require('fs');

var read = function(url) { // 用promise封装异步读取文件方法
    return new Promise(function(resolve, reject){
        fs.readFile(url, function(err, fileStr){
            if(err) {
                reject(err);
            } else {
                resolve(fileStr);
            }
        });
    });
}

var getType = function(str) {
    var suffix = str.substring(str.lastIndexOf('.'));
    if (suffix === ".js") {
        return "text/javascript"
    } else if (suffix === ".css") {
        return "text/css";
    } else {
        throw new Error("unknown file type" + str, "response_static");
    }
}

function ResponceStatic(url, dir) { // 接受一个查找起始路径, 以及查找目录所在的绝对路径
    return (async (ctx, next) => { 
        var reqPath = ctx.request.path;
        // console.log(ctx.request.path);
        if(reqPath.substring(0, url.length) === url) { // 在搜索路径下
            var absolutePath = dir + reqPath;
            // 解析ctx.request中的url，判断文件类型，读取文件为字符串，返回
            try {
                ctx.response.body = await read(absolutePath);
                ctx.response.type = getType(reqPath);
            } catch(err) {
                ctx.response.status = 404;
                console.log(err);
            }
        } else {
            await next();
        }
    });
}

module.exports = ResponceStatic;

/*var next = function(){};

var reqarr = ["./response_static.js", "../route/main.js", "../src/css/main.css", "../src/javascript/main.js"];

var strarr = ["./", "../route", "../src/css", "../src"];

reqarr.forEach(function(ele, ind){
    console.info(getType(ele));
});*/ //for test
