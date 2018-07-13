import { getUserId, Context } from "../../utils"
export default {
  async uploadProfilePicture(parent, args, ctx: Context, info) {
    console.log(
      "ajksdbflkajsdbflkjasbdlfkajshdblfkjahsdlkfjahsdlkfjahslkdjfhalksdhflaksjdfhlkajsdhflkjashdlfkjahsdlfkjhasldkfjhalsdkjfhalskdjhflaksjdfhlakshdf"
    )
    const userID = getUserId(ctx)
    if (!userID) {
      console.error("ERROR!")
    }
    const user = await ctx.db.mutation.updateUser(
      {
        data: {
          picture: args.pictureUrl
        },
        where: {
          id: userID
        }
      },
      info
    )
    return user
  }
}
