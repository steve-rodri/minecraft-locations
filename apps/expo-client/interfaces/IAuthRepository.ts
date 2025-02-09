export type User = {
  id: string
  email: string
  _verified: boolean
  createdAt: string
  updatedAt: string
}

export type Credentials = {
  email: string
  password: string
}

export type ResetPasswordArgs = {
  password: string
  token: string
}

type AuthResponse = {
  user: User
  token: string
}

export type CurrentUserResponse = AuthResponse & { exp: number }
export type LoginResponse = AuthResponse & { exp: number; message: string }
export type SignUpResponse = AuthResponse & { doc: User; message: string }
export type ResetPasswordResponse = AuthResponse & { message: string }

export interface IAuthRepository {
  signUp(credentials: Credentials): Promise<SignUpResponse | null>
  logIn(credentials: Credentials): Promise<LoginResponse | null>
  logOut(): Promise<void>
  resetPassword(args: ResetPasswordArgs): Promise<{ success: boolean }>
  forgotPassword(email: string): Promise<{ success: boolean }>
  currentUser(): Promise<AuthResponse | null>
}
