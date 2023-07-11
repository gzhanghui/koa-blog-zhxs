const Router = require('koa-router')
const axios =  require('axios')

const router = new Router({})


router.get('/article', async ctx => {

    let data = []

    data = await axios.get('http://localhost:5000/api/v1/article', {
        params: {
         
        }
    })
  
console.log(data.data.data)
    await ctx.render('article', {
        data:data.data.data.data,
        path: ctx.path,
    })
})


router.get('/article/:id', async ctx => {

    let data = []
    const id = ctx.url.split('/')[2]
    data = await axios.get(`http://localhost:5000/api/v1/article/${id}`, {
      params:{
        is_markdown:true
      }
    })
  
    await ctx.render('post', {
        data:data.data.data,
        path: ctx.path,
    })
})




module.exports = router