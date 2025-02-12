import { IAuthRepository, Credentials } from "../interfaces/IAuthRepository"
import axios, { AxiosInstance } from "axios"
import {
  sessionResponseSchema,
  stSignInResponseSchema,
  stSignUpResponseSchema,
} from "./supertokens/schemas"
import SecureStore from "expo-secure-store"
import { Platform } from "react-native"
import { API_URL } from "../env"

export class AuthRepository implements IAuthRepository {
  private axios: AxiosInstance = axios.create({
    baseURL: `${API_URL}/auth`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })

  constructor() {
    if (Platform.OS === "web") return
    // 🔄 Attach JWT on mobile (interceptor)
    this.axios.interceptors.request.use(async (config) => {
      const token = await SecureStore.getItemAsync("accessToken")
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })
  }

  async getSession() {
    try {
      return sessionResponseSchema.parse(await this.axios.get("/session"))
    } catch (error) {
      console.error(error)
    }
  }

  async signUp(credentials: Credentials) {
    try {
      const response = await this.axios.post("/signup", credentials)
      if (Platform.OS !== "web") await extractTokens(response.headers)
      const stResp = stSignUpResponseSchema.parse(response.data)
      if (stResp.status !== "OK") throw stResp
      return stResp.user
    } catch (error) {
      console.error(error)
    }
  }

  async signIn(credentials: Credentials) {
    try {
      const response = await this.axios.post("/signin", credentials)
      if (Platform.OS !== "web") await extractTokens(response.headers)
      const stResp = stSignInResponseSchema.parse(response.data)
      if (stResp.status !== "OK") throw stResp
      return stResp.user
    } catch (error) {
      console.error(error)
    }
  }

  async signOut(): Promise<void> {
    await this.axios.post("/signout")
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync("accessToken")
      await SecureStore.deleteItemAsync("refreshToken")
    }
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

const extractTokens = async (headers: any) => {
  const accessToken = headers["st-access-token"]
  const refreshToken = headers["st-refresh-token"]
  if (accessToken && refreshToken) {
    await SecureStore.setItemAsync("accessToken", accessToken)
    await SecureStore.setItemAsync("refreshToken", refreshToken)
  }
}
