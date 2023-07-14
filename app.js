require('module-alias/register')
const Koa = require('koa')
const koaStatic = require('koa-static')
const render = require("@koa/ejs")
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const path = require('path')
const chalk = require('chalk')
const onerror = require('koa-onerror')
const stylus = require('@/middlewares/stylus');
const config = require('@/middlewares/config')
const { initLoadRouters } = require('@/app/init')
require("@/app/sequelize")

const app = new Koa();

app.use(cors())
app.use(koaBody({ multipart: true }));
app.use(stylus({ src: path.join(__dirname, '/public/stylus'), dest: path.join(__dirname, './public/css') }))
app.use(koaStatic(path.join(__dirname, './public')))
app.use(config)

/**
 * ejs 渲染
 */
render(app, {
    root: path.join(__dirname, "view"),
    layout: "layout",
    viewExt: "ejs",
    cache: false,
    debug: false,
});

/**
 * 异常处理
 */
onerror(app, {
    accepts: () => 'json',
    json: (err, ctx) => {
        console.log(err)
        ctx.body = {
            message: err.message,
            code: err.code,
            status: err.status
        };
    },
});

/**
 * 加载所有 Routers
 */
initLoadRouters(app)

app.listen(3000, () => {
    console.log(chalk.green('server running at'), chalk.green(`http://localhost:3000`))
});


