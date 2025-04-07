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

const trpcExpressMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
})

export const createServer = async () => {
  const app = express()
  app.use(express.json())
  app.use(
    cors({
      // TODO: Add Origin for Mobile App
      origin: CLIENT_URL,
      allowedHeaders: ["content-type"],
      credentials: true,
    }),
  )

  app.use(loggerMiddleware)
  app.use("/trpc", trpcExpressMiddleware)

  // @ts-expect-error overload
  app.use("/trpc-panel", (_, res) => {
    return res.send(renderTrpcPanel(appRouter, { url: `${BASE_URL}/trpc` }))
  })

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions))

  app.use(errorLogger)
  return {
    app: http.createServer(app),
  }
}
