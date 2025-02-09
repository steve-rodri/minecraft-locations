import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { SessionRequest } from "supertokens-node/framework/express"

import { PointRepository } from "../repositories/PointRepository"
import { ServerRepository } from "../repositories/ServerRepository"

type ContextOpts = {
  req: CreateExpressContextOptions["req"] & SessionRequest
  res: CreateExpressContextOptions["res"]
}

export const createContext = async ({ req }: ContextOpts) => {
  const pointRepo = new PointRepository()
  const serverRepo = new ServerRepository()
  if (req.session) {
    const id = req.session.getUserId()
    return { user: { id }, pointRepo, serverRepo }
  }
  return { pointRepo, serverRepo }
}

export type Context = Awaited<ReturnType<typeof createContext>>
