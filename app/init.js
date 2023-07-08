const Router = require('koa-router')
const requireDir = require('require-directory')

const router = new Router()


function initLoadRouters(app) {
    const apiDirectory = `${process.cwd()}/app/router`
    requireDir(module, apiDirectory, {
        visit: (obj) => {
            whenLoadModule(obj, app)
        }
    })
}

function whenLoadModule(obj, app) {
    if (obj instanceof Router) {
        app.use(obj.routes()).use(router.allowedMethods());
    }
}
module.exports = {
    initLoadRouters
}