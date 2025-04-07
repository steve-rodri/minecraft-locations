import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

import { PointRepository } from "../repositories/PointRepository"
import { ServerRepository } from "../repositories/ServerRepository"
import { decodeFirebaseIdToken } from "../firebase/decodeToken"

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  const pointRepo = new PointRepository()
  const serverRepo = new ServerRepository()
  const user = await decodeFirebaseIdToken(req.headers.authorization)
  if (user) {
    return { user: { id: user.uid }, pointRepo, serverRepo }
  }
  return { pointRepo, serverRepo }
}

export type Context = Awaited<ReturnType<typeof createContext>>
