/*
 * 首页加载和获得爬取数据时的资源请求
 */

const childProcess = require('child_process');

var crawlWrapper = function(_isbn) {
    return new Promise(function(resolve, reject){
        childProcess.execFile('python', ['./src/crawler/crawler.py', _isbn], function(err, stdout, stderr) {
            // 子进程异步执行爬取，返回到stdout中一个字符串
            if(!err) {
                resolve(stdout);
            } else {
                reject(err);
            }
        });
    });
}

// var mainPage = async (ctx, next) => {
//     ctx.render('main.html', {
//         title: "ebookshelf",
//         introduction: "this is the info got from claw"
//     });
// }

var getCrawledData = async (ctx, next) => { // 响应post的json数据{"isbn":number}
    console.log(ctx.request.body);
    var _isbn = ctx.request.body.isbn;
    var data;
    try {
        console.log(_isbn);
        data = await crawlWrapper(_isbn);
        ctx.response.body = JSON.parse(data);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {/*"GET /": mainPage,*/"POST /api/crawl": getCrawledData};