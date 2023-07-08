const Router = require('koa-router')
const router = new Router({})
const axios =  require('axios')


router.get('/about', async ctx => {

    let data = []

    data = await axios.get('http://localhost:5000/api/v1/article', {
        params: {
         
        }
    })
  
console.log(data.data.data)
    await ctx.render('about', {
        data:data.data.data.data,
        path: ctx.path,
    })
})





module.exports = router