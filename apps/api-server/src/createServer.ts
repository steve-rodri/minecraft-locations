import supertokens from "supertokens-node"
import {
  errorHandler,
  middleware as supertokensMiddleware,
} from "supertokens-node/framework/express"
import { verifySession } from "supertokens-node/recipe/session/framework/express"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import swaggerUi from "swagger-ui-express"
import swaggerOptions from "./swagger.options"
import express from "express"
import cors from "cors"
import http from "http"

import { appRouter, createContext } from "./trpc"
import { BASE_URL, CLIENT_URL } from "./env"
import { renderTrpcPanel } from "trpc-panel"
import { loggerMiddleware, errorLogger } from "./logger"
import { initSuperTokens } from "./supertokens/init"

const trpcExpressMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
})

export const createServer = async () => {
  initSuperTokens()
  const app = express()
  app.use(express.json())
  app.use(
    cors({
      // TODO: Add Origin for Mobile App
      origin: CLIENT_URL,
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      credentials: true,
    }),
  )
  app.use(supertokensMiddleware())

  app.use(loggerMiddleware)
  app.use("/trpc", verifySession(), trpcExpressMiddleware)

  // @ts-expect-error overload
  app.use("/trpc-panel", (_, res) => {
    return res.send(renderTrpcPanel(appRouter, { url: `${BASE_URL}/trpc` }))
  })

  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerOptions))

  app.use(errorLogger)
  app.use(errorHandler())
  return {
    app: http.createServer(app),
  }
}
