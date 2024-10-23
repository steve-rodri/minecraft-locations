import {
  IAuthRepository,
  Credentials,
  ResetPasswordArgs,
  SignUpResponse,
  LoginResponse,
  ResetPasswordResponse,
  CurrentUserResponse,
} from "../interfaces/IAuthRepository"
import axios, { AxiosInstance } from "axios"

export class AuthRepository implements IAuthRepository {
  private axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async currentUser(): Promise<CurrentUserResponse | null> {
    const response = await this.axios.post<CurrentUserResponse | null>(
      "/users/me"
    )
    return response.data
  }

  async signUp(credentials: Credentials): Promise<SignUpResponse | null> {
    const response = await this.axios.post<SignUpResponse>(
      "/users",
      credentials
    )
    return response.data
  }

  async logIn(credentials: Credentials): Promise<LoginResponse | null> {
    const response = await this.axios.post<LoginResponse>(
      "/users/login",
      credentials
    )
    return response.data
  }

  async logOut(): Promise<void> {
    await this.axios.post<{ message: string }>("/users/logout")
  }

  async resetPassword(args: ResetPasswordArgs): Promise<{ success: boolean }> {
    const response = await this.axios.post<ResetPasswordResponse>(
      "/users/reset-password",
      args
    )
    if (response.data.token) return { success: true }
    return { success: false }
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    await this.axios.post<{ message: string }>("/users/forgot-password", {
      email,
    })
    return { success: true }
  }
}
