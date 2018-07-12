import { getUserId, Context } from "../../utils"
export default {
  async uploadProfilePicture(parent, args, ctx: Context, info) {
    const userID = getUserId(ctx)
    const user = await ctx.db.mutation.updateUser({
      data: {
        picture: args.pictureURL
      },
      where: {
        id: userID
      }
    }, info)
    return user
  },

}