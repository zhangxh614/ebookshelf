/*
 * 首页加载时的资源请求 
 */

var mainPage = async (ctx, next) => {
    ctx.render('main.html', {
        title: "ebookshelf",
        introduction: "this is the info got from claw"
    });
}

module.exports({"GET /": mainPage});