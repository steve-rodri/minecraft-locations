import { IAuthRepository, Credentials } from "../interfaces/IAuthRepository"
import axios, { AxiosInstance } from "axios"
import {
  STUser,
  stSignInResponseSchema,
  stSignUpResponseSchema,
} from "./supertokens/schemas"
import Supertokens from "supertokens-react-native"

export class AuthRepository implements IAuthRepository {
  private axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async currentUser(): Promise<STUser | undefined> {
    return
  }

  async signUp(credentials: Credentials) {
    try {
      const resp = stSignUpResponseSchema.parse(
        await this.axios.post("/signup", credentials),
      )
      if (resp.status !== "OK") throw resp
      const sessionExists = await Supertokens.doesSessionExist()
      if (!sessionExists) {
        throw new Error("Session does not exist (thrown from signIn)")
      }

      const payload = await Supertokens.getAccessTokenPayloadSecurely()
      console.log("Payload", payload)

      const token = await Supertokens.getAccessToken()
      if (!token) {
        throw new Error("Unable to get Access Token (thrown from signIn)")
      }
      return { user: resp.user, token }
    } catch (error) {
      console.error(error)
    }
  }

  async signIn(credentials: Credentials) {
    try {
      const resp = stSignInResponseSchema.parse(
        await this.axios.post("/signin", credentials),
      )
      if (resp.status !== "OK") throw resp
      const sessionExists = await Supertokens.doesSessionExist()
      if (!sessionExists) {
        throw new Error("Session does not exist (thrown from signIn)")
      }
      const token = await Supertokens.getAccessToken()
      if (!token) {
        throw new Error("Unable to get Access Token (thrown from signIn)")
      }
      return { user: resp.user, token }
    } catch (error) {
      console.error(error)
    }
  }

  async signOut(): Promise<void> {
    await Supertokens.signOut()
  }

  async resetPassword(password: string): Promise<{ success: boolean }> {
    const response = await this.axios.post("/reset-password", { password })
    if (response.data.token) return { success: true }
    return { success: false }
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    await this.axios.post<{ message: string }>("/forgot-password", { email })
    return { success: true }
  }
}
