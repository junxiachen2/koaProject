const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')
const route = require('./router')
const config = require('./config')

const app = new Koa()

// ctx.body解析中间件
app.use(bodyParser())

// 静态文件和模板
app.use(static(path.join(__dirname, config.staticPath)))
app.use(views(config.viewPath, { extension: 'ejs' }))

// 记录时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(route.routes())
app.listen(config.port)