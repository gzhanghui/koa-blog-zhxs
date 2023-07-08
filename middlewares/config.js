const themeCfg = {
    nav: [{
        link: '/',
        label: '首页',
        icon: 'home',
    },
    {
        link: '/article/',
        label: '文章',
        icon: 'blog',
    },
    {
        link: '/about',
        label: '关于',
        icon: 'about',
    },
    {
        link: '/project',
        label: '项目',
        icon: 'project',
    }],
    swiper: [
        'https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx2aXN1YWwtc2VhcmNofDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1655658233701-a0bada796e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1504204267155-aaad8e81290d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    ]
}

const config = async (ctx, next) => {
    ctx.state.config = themeCfg
    ctx.state.path = ctx.path
    ctx.state.isHome = () => ctx.path === '/'
    ctx.state.isPost = () => {
      return  ctx.path.includes('/article/') && ctx.path !== '/article/'
    }

    await next()
}

module.exports = config