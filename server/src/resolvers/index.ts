import { extractFragmentReplacements } from "prisma-binding"
import Viewer from "./Viewer"
import Query from "./Query"
import { auth } from "./Mutation/auth"
import tweet from "./Mutation/tweet"
import { AuthPayload } from "./AuthPayload"
import uploadFile from "./Mutation/uploadFile"

export const resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...tweet,
    ...uploadFile
  },
  Viewer,
  AuthPayload
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
