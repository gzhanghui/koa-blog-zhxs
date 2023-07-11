const Router = require('koa-router')
const { SitemapStream, streamToPromise, XMLToSitemapItemStream } = require('sitemap')
const { createWriteStream, createReadStream } = require('fs');
const axios = require('axios')

const router = new Router({})

router.get('/sitemap.xml', async ctx => {
    try {
        const sitemap = new SitemapStream({ hostname: 'http://www.wsying.top/' });
        const writeStream = createWriteStream('./sitemap.xml');
        sitemap.pipe(writeStream);
        sitemap.write({ url: '/', changefreq: 'daily', priority: 0.3 });
        const data = await axios.get('http://localhost:5000/api/v1/article')
        let urls = []
        if (data.data.code === 200) {
            urls = data.data.data.data.map(article => {
                return {
                    url: `/article/${article.id}`,
                    lastmod: article.created_at,
                    changefreq: 'monthly',
                    priority: 0.6,
                }
            });
        }

        urls.forEach(item => {
            sitemap.write(item);
        });

        sitemap.end();

        let sm = new SitemapStream();
        createReadStream('./sitemap.xml')
            .pipe(new XMLToSitemapItemStream())
            .pipe(sm)
        let res = await streamToPromise(sm);
        ctx.set('Content-Type', 'application/xml')
        ctx.body = res;
    } catch (e) {
        console.error(e)
    }

})

module.exports = router
