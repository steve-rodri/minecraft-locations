export type User = {
  id: string
  email: string
}

export type Credentials = {
  email: string
  password: string
}

export type ResetPasswordArgs = {
  password: string
  token: string
}

export interface IAuthRepository {
  signUp(credentials: Credentials): Promise<User | null>
  logIn(credentials: Credentials): Promise<User | null>
  logOut(): Promise<void>
  resetPassword(args: ResetPasswordArgs): Promise<{ success: boolean }>
  forgotPassword(email: string): Promise<{ success: boolean }>
}
