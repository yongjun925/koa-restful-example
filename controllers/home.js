module.exports = {
  async hi (ctx) {
    ctx.body = 'Hello Koa'
  },
  async error (ctx) {
    ctx.throw('custom error')
  }
}
