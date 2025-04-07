import firebase from "firebase-admin"

import {
  FIREBASE_CONFIG_BASE64,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
} from "../env"

const serviceAccount = JSON.parse(
  Buffer.from(FIREBASE_CONFIG_BASE64 ?? "", "base64").toString("ascii"),
)

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: FIREBASE_STORAGE_BUCKET,
  databaseURL: FIREBASE_DATABASE_URL,
})
