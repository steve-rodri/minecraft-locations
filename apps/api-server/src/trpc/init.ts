import { initTRPC } from "@trpc/server"
import { TRPCPanelMeta } from "trpc-panel"

import { Context } from "./context"

const t = initTRPC.context<Context>().meta<TRPCPanelMeta>().create()

export const trpcRouter = t.router
export const trpcMiddleware = t.middleware
export const publicProcedure = t.procedure
