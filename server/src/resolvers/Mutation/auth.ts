import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import { Context } from "../../utils"
import * as aws from "aws-sdk"

const s3Bucket = process.env.S3_BUCKET;

export const auth = {
  async signup(parent, args, ctx: Context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  async login(parent, { email, password }, ctx: Context, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`No such user found for email: ${email}`)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error("Invalid password")
    }

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },

  async signS3(parent, { filename, filetype }) {
    const s3 = new aws.S3();

    const s3Params = {
      Bucket: s3Bucket,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read',
    };

    const signedRequest = await s3.getSignedUrl('putObject', s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url,
    };
  },
}
