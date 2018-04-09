const statuses = require('statuses')
module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500
      if (ctx.status === 500) {
        ctx.app.emit('error', err, ctx)
      }
      ctx.body = {
        status: ctx.status,
        error: statuses[ctx.status],
        message: err.message
      }
    }
  }
}
