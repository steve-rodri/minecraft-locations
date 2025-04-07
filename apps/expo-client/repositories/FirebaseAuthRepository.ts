import { Alert } from "react-native"
import { IAuthRepository, Credentials } from "../interfaces/IAuthRepository"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth"

import { auth } from "../lib/firebase"

export class FirebaseAuthRepository implements IAuthRepository {
  async currentUser() {
    return auth.currentUser
  }

  async signUp({ email, password }: Credentials): Promise<User | undefined> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  }

  async signIn({ email, password }: Credentials): Promise<User | undefined> {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  }

  async signOut() {
    await firebaseSignOut(auth)
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    try {
      await sendPasswordResetEmail(auth, email)
      Alert.alert(
        "Email Sent",
        "Please check your email for instructions on how to reset your password.",
        [{ text: "OK", onPress: () => null }],
      )
      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }
  async resetPassword(): Promise<{ success: boolean }> {
    return { success: true }
  }
}
