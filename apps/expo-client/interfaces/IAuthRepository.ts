import { STUser } from "../repositories/supertokens/schemas"

export type Credentials = {
  email: string
  password: string
}

export type SuccessfulResponse = {
  user: STUser
  token: string
}

export interface IAuthRepository {
  currentUser(): Promise<STUser | undefined>
  signUp(credentials: Credentials): Promise<SuccessfulResponse | undefined>
  signIn(credentials: Credentials): Promise<SuccessfulResponse | undefined>
  signOut(): Promise<void>
  resetPassword(password: string): Promise<{ success: boolean }>
  forgotPassword(email: string): Promise<{ success: boolean }>
}
