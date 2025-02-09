import { createServer } from "./createServer"
import { BASE_URL, PORT } from "./env"
import { logger } from "./logger"

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
    logger.info(`API Docs: ${BASE_URL}/`)
    logger.info(`trpc Panel: ${BASE_URL}/trpc-panel`)
  })
})
