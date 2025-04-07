import * as admin from "firebase-admin"

import logger from "../logger"

import firebase from "./init"

export const getTokenFromHeader = (authorization?: string) => {
  if (!authorization || typeof authorization !== "string") return undefined
  if (!authorization.toLowerCase().startsWith("bearer ")) return undefined

  const token = authorization.slice(7).trim()
  return token || undefined
}

export const decodeFirebaseIdToken = async (
  authorizationHeader?: string,
): Promise<admin.auth.DecodedIdToken | undefined> => {
  const token = getTokenFromHeader(authorizationHeader)
  try {
    if (!token || token === undefined) return
    const decodedToken = await firebase.auth().verifyIdToken(token)
    return decodedToken
  } catch (err) {
    logger.error("Error decoding Firebase ID Token")
    logger.error(`Received Firebase ID Token: ${token}`)
    throw err
  }
}
