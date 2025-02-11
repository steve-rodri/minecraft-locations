import EmailPassword from "supertokens-web-js/recipe/emailpassword"
import Session from "supertokens-web-js/recipe/session"
import { IAuthRepository, Credentials } from "../interfaces/IAuthRepository"
import { STUser } from "./supertokens/schemas"

export class AuthRepository implements IAuthRepository {
  async currentUser() {
    const payload = await Session.getAccessTokenPayloadSecurely()
    return payload
  }

  async signUp(credentials: Credentials): Promise<STUser | undefined> {
    try {
      const resp = await EmailPassword.signUp({
        formFields: [
          {
            id: "email",
            value: credentials.email,
          },
          {
            id: "password",
            value: credentials.password,
          },
        ],
      })
      if (resp.status === "OK") return resp.user
      throw resp
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  async signIn(credentials: Credentials): Promise<STUser | undefined> {
    try {
      const resp = await EmailPassword.signIn({
        formFields: [
          {
            id: "email",
            value: credentials.email,
          },
          {
            id: "password",
            value: credentials.password,
          },
        ],
      })
      if (resp.status === "OK") return resp.user
      throw resp
    } catch (error) {
      console.error("Error signing in:", error)
    }
  }

  async signOut() {
    await EmailPassword.signOut()
    await Session.signOut()
  }

  async resetPassword(password: string): Promise<{ success: boolean }> {
    try {
      const resp = await EmailPassword.submitNewPassword({
        formFields: [
          {
            id: "password",
            value: password,
          },
        ],
      })
      if (resp.status === "OK") return { success: true }
      throw resp
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    try {
      const resp = await EmailPassword.sendPasswordResetEmail({
        formFields: [
          {
            id: "email",
            value: email,
          },
        ],
      })
      if (resp.status === "OK") return { success: true }
      throw resp
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  }
}
