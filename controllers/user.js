module.exports = {
  async show (ctx) {
    const { id } = ctx.param
    const { User } = ctx.models
    ctx.body = await User.findById(id)
  },
  async create (ctx) {
    const { User } = ctx.models
    const userModel = await User.create({
      name: 'test1'
    })
    ctx.status = 201
    ctx.body = userModel
  },
  async list (ctx) {
    const { User } = ctx.models
    const { page, limit } = ctx.vals
    const count = await ctx.services.user.count(ctx)
    const list = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
    ctx.body = {
      count,
      page,
      limit,
      list,
    }
  }
}
