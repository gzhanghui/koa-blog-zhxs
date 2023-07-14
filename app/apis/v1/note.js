const Router = require("koa-router");

const { Note } = require("@/app/models/note");
const router = new Router({
  prefix: "/v1/note",
});
router.get("/list", async (ctx) => {
  const res = await Note.findAll({
    attributes: { exclude: ["status"] },
  });
  ctx.body = res;
});

module.exports = router;
