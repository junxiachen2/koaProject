const Router = require('koa-router')
const router = new Router()
const todo = require('../controller/todo')
router.get('/api/list', todo.list)
router.post('/api/add', todo.add)
router.post('/api/update', todo.update)
router.post('/api/delete', todo.delete)
router.get('/', async ctx => {
    await ctx.render('home', {
        title: '主页',
        data: {
            list: [
                {
                    name: 'Karry Wang',
                    age: 19
                },
                {
                    name: 'Roy Wang',
                    age: 17
                },
                {
                    name: 'Jackson Yee',
                    age: 17
                }
            ]
        }
    })
})
router.get('/*', async ctx => {
    await ctx.render('404')
})
module.exports = router
