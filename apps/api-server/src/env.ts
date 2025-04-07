import "dotenv/config"
export const PORT = process.env.PORT || 5500
export const BASE_URL = process.env.BASE_URL || "http://localhost:5500"
export const DATABASE_URL = process.env.DATABASE_URL
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:8082"
export const SUPER_TOKENS_CONNECTION_URI =
  process.env.SUPER_TOKENS_CONNECTION_URI || "http://localhost:3567"

export const FIREBASE_CONFIG_BASE64 = process.env.FIREBASE_CONFIG_BASE64
export const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET
