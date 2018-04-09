const config = require('config')
const fs = require('fs-extra')
const { SwaggerAPI } = require('koa-joi-router-docs')
const Router = require('koa-joi-router')
const validate = require('./validate/index')
const { secret } = config.get('jwt')
const jwt = require('koa-jwt')({ secret })
module.exports = function (app) {
  const { user, home } = app.controllers
  const router = new Router()

  router.get('/user/:_id', {
    meta: {
      swagger: {
        summary: '获取用户信息',
        description: `Note: \nSensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.`,
        tags: ['users']
      }
    },
    validate: validate['/user/:_id'],
    handler: user.show
  })

  router.post('/signup', {
    meta: {
      swagger: {
        summary: '用户注册',
        description: '使用用户名和密码注册。',
        tags: ['users']
      }
    },
    validate: validate['/signup'],
    handler: async ctx => {
      console.log(ctx.request.body)
      ctx.body = {
        userId: ctx.request.body.username
      }
    }
  })

  /**
 * Generate Swagger json from the router object
 */
  const generator = new SwaggerAPI()
  generator.addJoiRouter(router)

  const spec = generator.generateSpec({
    info: {
      title: 'Example API',
      description: 'API for creating and editing examples.',
      version: '1.1'
    },
    basePath: '/',
    tags: [{
      name: 'users',
      description: `A User represents a person who can login 
      and take actions subject to their granted permissions.`
    }],
    schemes: ['http', 'https']
  },
    {
      defaultResponses: {} // Custom default responses if you don't like default 200
    })

  fs.writeFileSync(`${__dirname}/swagger.json`, JSON.stringify(spec, null, '  '))

  /**
   * Swagger JSON API
   */
  router.get('/_api.json', async ctx => {
    ctx.body = JSON.stringify(spec, null, '  ')
  })

  /**
   * API documentation
   */
  router.get('/apiDocs', async ctx => {
    ctx.body = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Example API</title>
      </head>
      <body>
        <redoc spec-url='/_api.json' lazy-rendering></redoc>
        <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
      </body>
      </html>
      `
  })

  router.get('/', home.hi)
  router.get('/error', home.error)
  // jwt
  router.get('/users/:id', jwt, user.show)
  app.use(router.middleware())
}
