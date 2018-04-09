const Koa = require('koa')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const favicon = require('koa-favicon')
const cors = require('@koa/cors')
const koaStatic = require('koa-static')
const path = require('path')
const config = require('config')
const swagger = require('swagger-injector')

const mongoose = require('mongoose')
const { uri, options } = config.get('mongoose')
mongoose.connect(uri, options)

const app = new Koa()

// error handling
app.use(require('./middlewares/error-handling')())

// static
app.use(favicon(path.resolve(__dirname, './public/favicon.ico')))
app.use(koaStatic(path.resolve(__dirname, './public')))

// middleware
app.use(helmet())
app.use(cors())
if (app.env === 'development') {
  app.use(logger())
}

// 解决swagger-injector返回js 与 koa-helmet 冲突问题
app.use(async (ctx, next) => {
  await next();
  if (ctx.request.path && ctx.request.path.indexOf('.js') == ctx.request.path.length - 3) {
    ctx.set('Content-Type', 'application/javascript');
  }
});

// init app
require('./lib/init')(app)

// router
require('./routes')(app)

// swagger
if (app.env === 'development') {
  app.use(swagger.koa({
    path: `${__dirname}/swagger.json`,
  }));
}

// error log
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

if (!module.parent) {
  const port = process.env.PORT || '3000'
  app.listen(port)
  console.log('Listening on ' + port)
}

module.exports = app
