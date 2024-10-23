import {
  IAuthRepository,
  Credentials,
  User,
  ResetPasswordArgs,
} from "../interfaces/IAuthRepository"
import axios, { AxiosInstance } from "axios"

export class AuthRepository implements IAuthRepository {
  axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async signUp(credentials: Credentials): Promise<User | null> {}

  async logIn(credentials: Credentials): Promise<User | null> {
    const response = await axios.post<LoginResponse>(
      "/users/login",
      credentials
    )
    return response.data.user
  }

  async logOut(): Promise<void> {
    await axios.post<{ message: string }>("/users/logout")
  }

  async resetPassword(args: ResetPasswordArgs): Promise<{ success: boolean }> {
    const response = await axios.post<ResetPasswordResponse>(
      "/users/reset-password",
      args
    )
    if (response.data.token) return { success: true }
    return { success: false }
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    await axios.post<{ message: string }>("/users/forgot-password", { email })
    return { success: true }
  }
}

type LoginResponse = {
  message: string
  user: {
    id: string
    email: string
    _verified: boolean
    createdAt: string
    updatedAt: string
  }
  token: string
  exp: number
}

type ResetPasswordResponse = {
  message: string
  token: string
  user: {
    id: string
    email: string
    _verified: boolean
    createdAt: string
    updatedAt: string
  }
}
