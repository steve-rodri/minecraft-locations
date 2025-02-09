import "dotenv/config"
export const PORT = process.env.PORT || 5500
export const BASE_URL = process.env.BASE_URL || "http://localhost:5500"
export const DATABASE_URL = process.env.DATABASE_URL
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:8081"
export const SUPER_TOKENS_CONNECTION_URI =
  process.env.SUPER_TOKENS_CONNECTION_URI || "http://localhost:3567"
