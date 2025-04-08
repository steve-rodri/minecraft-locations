import firebase from "firebase-admin"

import { FIREBASE_CONFIG_BASE64 } from "../env"

const serviceAccount = JSON.parse(
  Buffer.from(FIREBASE_CONFIG_BASE64 ?? "", "base64").toString("ascii"),
)

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})
