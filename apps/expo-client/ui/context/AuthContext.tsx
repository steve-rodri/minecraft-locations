import { createContext, ReactNode, useContext } from "react"

import { Credentials } from "../../interfaces/IAuthRepository"
import { STUser } from "../../repositories/supertokens/schemas"
import { useAuthState } from "../../hooks/useAuthState"
import { AuthRepository } from "../../repositories/AuthRepository"

const AuthContext = createContext<{
  signIn: (values: Credentials) => Promise<{ success: boolean }>
  signOut: () => void
  isAuthenticated: boolean | null
  user?: STUser
  isLoading: boolean
} | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthState()
  const authRepo = new AuthRepository()

  const signIn = async (credentials: Credentials) => {
    const user = await authRepo.signIn(credentials)
    if (!user) return { success: false }
    return { success: true }
  }

  const signOut = () => {
    authRepo.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />")
  }
  return value
}
