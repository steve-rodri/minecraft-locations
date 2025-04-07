import { initializeApp } from "firebase/app"
import { initializeAuth, onAuthStateChanged, type User } from "firebase/auth"
import { FIREBASE_API_KEY } from "../env"

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "minecraft-locations-a963f.firebaseapp.com",
  projectId: "minecraft-locations-a963f",
  storageBucket: "minecraft-locations-a963f.firebasestorage.app",
  messagingSenderId: "471475836471",
  appId: "1:471475836471:web:510bd8973615af37b051b2",
  measurementId: "G-9S2RBPML8S",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app)
export const firebaseUser = auth.currentUser

export const onAuthStateChangeListener = (
  callback: (data: User | null) => Promise<void>,
) => onAuthStateChanged(auth, callback)

export const formatAuthError = (errCode: string) => {
  switch (errCode) {
    case "auth/weak-password":
      return "Password must be at least 8 characters"
    case "auth/wrong-password":
      return "Password Invalid or No Password"
    case "auth/invalid-email":
      return "Invalid Email"
    case "auth/user-not-found":
      return "No user found with those credentials"
    case "auth/email-already-in-use":
      return "Email is already in use. Try logging in instead."
    case "auth/network-request-failed":
      return "Request failed due to network connection"
    case "auth/too-many-requests":
      return "Account temporarily disabled due to many failed login attempts. Reset Password or try again later."
    case "firestore/unavailable":
      return "Server Unavailable"
    default:
      return "Provide the email and password associated with your account"
  }
}
