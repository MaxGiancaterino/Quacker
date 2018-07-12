import { getUserId, Context } from "../../utils"
export default {
  async createTweet(parent, args, ctx: Context, info) {
    const userID = getUserId(ctx)
    const tweet = await ctx.db.mutation.createTweet({
      data: {
        text: args.text,
        author: {
          connect: {
            id: userID
          }
        }
      },
    }, info)
    return tweet
  },

}
