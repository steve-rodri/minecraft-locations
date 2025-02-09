import { trpcRouter } from "./init"
import { pointRouter } from "../routers/pointRouter"
import { serverRouter } from "../routers/serverRouter"

export const appRouter = trpcRouter({
  points: pointRouter,
  servers: serverRouter,
})

export type AppRouter = typeof appRouter
