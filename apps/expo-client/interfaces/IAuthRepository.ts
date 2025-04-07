import { User } from "firebase/auth"

export type Credentials = {
  email: string
  password: string
}

export interface IAuthRepository {
  signUp(credentials: Credentials): Promise<User | undefined>
  signIn(credentials: Credentials): Promise<User | undefined>
  signOut(): Promise<void>
  // resetPassword(password: string): Promise<{ success: boolean }>
  forgotPassword(email: string): Promise<{ success: boolean }>
}
