import { Context } from "../utils"

export default {
  viewer: () => ({}),
  tweets: async (parent, args, ctx: Context, info) => {
    console.log({ info })
    return ctx.db.query.tweets(
      {
        ...args
      },
      info
    )
  },
  async user(parent, args, ctx: Context, info) {
    const user = await ctx.db.query.user(
      {
        where: args.where
      },
      info
    )
    return user
  }
}
