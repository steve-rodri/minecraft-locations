import expressWinston from "express-winston"
import winston, { transports } from "winston"

const loggerOptions: winston.LoggerOptions & expressWinston.LoggerOptions = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: "warn",
      filename: "logs/request-warnings.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/request-errors.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
  ),
  meta: true,
  colorize: false,
  expressFormat: true,
  statusLevels: true,
}

// normal logger instance
// always use instead of console.log
export const logger = winston.createLogger(loggerOptions)
export const testLogger = winston.createLogger({
  ...loggerOptions,
  transports:
    process.env.NODE_ENV === "test" ? [new transports.Console()] : undefined,
})

// http logger middleware
export const loggerMiddleware = expressWinston.logger(loggerOptions)

const errorFormat = winston.format.printf(({ level, meta, timestamp }) => {
  // @ts-expect-error meta is unknown
  return `${timestamp} ${level}: ${meta.message}`
})

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({
      filename: "logs/internal-errors.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    errorFormat,
  ),
})

// use always instead of console.log
export default logger
