import { STUser, SessionResponse } from "../repositories/supertokens/schemas"

export type Credentials = {
  email: string
  password: string
}

export interface IAuthRepository {
  getSession(): Promise<SessionResponse | undefined>
  signUp(credentials: Credentials): Promise<STUser | undefined>
  signIn(credentials: Credentials): Promise<STUser | undefined>
  signOut(): Promise<void>
  resetPassword(password: string): Promise<{ success: boolean }>
  forgotPassword(email: string): Promise<{ success: boolean }>
}
