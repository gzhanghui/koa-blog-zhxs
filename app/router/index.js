const Router = require('koa-router')
const axios = require('axios')
const router = new Router({})



router.get('/', async ctx => {
// Access-Control-Allow-Origin:www.scczz.com
    let title = 'hello world'
    const res = await axios.get('https://v1.hitokoto.cn/?encode=json', {
        params: {
            min_length: 80,
            max_length: 300
        }
    })
    const hitokoto = renderSentence(res.data)

    await ctx.render('index', {
        title,
        path: ctx.path,
        hitokoto
    })
})



function renderSentence(data) {
    let html = `<p>${data.hitokoto}</p>`
    html = `${html}<p class="meta-from">—— <span>@${data.creator}</span><span>「${data.from}」</span></p>`
    return html
}

module.exports = router