module.exports = {
  async count (ctx) {
    const { User } = ctx.models
    const count = await User.count()
    return count
  }
}
