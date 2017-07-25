
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const templating = require('./server/templating');

const app = new Koa();

const router = require("koa-router")();

const ResponseStatic = require('./server/response_static');

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime();
    var execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
}); // 记录后续响应时间用的中间件


app.use(bodyParser()); // 为了parse一下post请求的中间件

app.use(templating('./', { // 为了能够调用render向模板中喂数据的中间件
    noCache: false,
    watch: false
}));

router.get("/", async(ctx, next) => { // router中间件注册'GET /'请求
    ctx.render('main.html', {
        title: "ebookshelf",
        introduction: "this is the info got from claw"
    });
});

app.use(router.routes());

console.log(__dirname);

app.use(ResponseStatic('\/', __dirname)); // 添加响应'GET css/js'请求的中间件

app.listen(3000);
console.log('app started at port 3000...');
