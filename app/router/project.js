const Router = require('koa-router')
const router = new Router({})
const axios = require('axios')
const cheerio = require('cheerio');



router.get('/project', async ctx => {

    let data = []

    data = await axios.get('https://order.imooc.com/myorder', {
        params: {

        },
        headers: {
            Cookie: `apsid=E1YjNjYTY0Mzk5NzU3MjFjNDY0MDgxNWYwNzcxMTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDIzNDE0NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMjU3MTI2MTEzQHFxLmNvbQAAAAAAAAAAAAAAAAAAADliNTVkMzc5NTJjYjAxMzNkNGYwZDVkYjQyOGNkODMya8aMZC13ZWE%3DMG; `
        }
    })
    const $ = cheerio.load(data.data);
    const list = $('.myOrder-list li')
    const res = []
    list.each(function (item) {
        res.push({
            href: $(this).find('dd a').attr('href'),
            title: $(this).find('.course-name').text(),
            image: $(this).find('dd img').attr('src'),
        })
    })

    await ctx.render('project', {
        data: res,
        path: ctx.path,
    })
})





module.exports = router