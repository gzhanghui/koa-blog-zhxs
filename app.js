const moduleAlias = require('module-alias')
moduleAlias.addAlias('@', __dirname)

const path = require('path')
const chalk = require('chalk')

const Koa = require('koa')
const koaStatic = require('koa-static')
const render = require("@koa/ejs")
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')
const onerror = require('koa-onerror')
const stylus = require('@/middlewares/stylus');
const config = require('@/middlewares/config')
const { initLoadRouters } = require('@/app/init')

const app = new Koa();
app.use(cors())
app.use(koaBody({ multipart: true }));
app.use(stylus({ src: path.join(__dirname, '/public/stylus'), dest: path.join(__dirname, './public/css') }))
app.use(koaStatic(path.join(__dirname, './public')))
app.use(config)

render(app, {
    root: path.join(__dirname, "view"),
    layout: "layout",
    viewExt: "ejs",
    cache: false,
    debug: false,
});


onerror(app, {
    accepts: () => 'html',
    json: (err, ctx) => {
        console.log(err)
        ctx.body = {
            message: err.message,
            code: err.code,
            status: err.status
        };
    },
});


initLoadRouters(app)

app.listen(5200, '127.0.0.1', () => {
    console.log(chalk.green('server running at'), chalk.green(`http://localhost:5000`))
});


