const Router = require("koa-router");
const requireDir = require("require-directory");

const router = new Router();

function initLoadRouters(app) {
  const apiDir = `${process.cwd()}/app/apis`;
  const routerDir = `${process.cwd()}/app/router`;
  [apiDir, routerDir].forEach((dir) => {
    requireDir(module, dir, {
      visit: (obj) => {
        whenLoadModule(obj, app);
      },
    });
  });
}

function whenLoadModule(obj, app) {
  if (obj instanceof Router) {
    app.use(obj.routes()).use(router.allowedMethods());
  }
}
module.exports = {
  initLoadRouters,
};
