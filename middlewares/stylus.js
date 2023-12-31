const stylus = require('stylus');

module.exports = function (options) {
  const middleware = stylus.middleware(options);

  const compile = (req, res) => new Promise((resolve, reject) => {
    middleware(req, res, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  });

  return async function (ctx, next) {
    await compile(ctx.req, ctx.res);
    await next();
  };
};