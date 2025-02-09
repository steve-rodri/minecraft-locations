import { createContext, ReactNode, useContext, useEffect } from "react"
import { useStorageState } from "../../hooks/useSessionState"

import { authRepo } from "../../repositories/index"
import { Credentials, User } from "../../interfaces/IAuthRepository"

const AuthContext = createContext<{
  logIn: (values: Credentials) => Promise<{ success: boolean }>
  logOut: () => void
  session?: string | null
  user?: User | null
  isLoading: boolean
} | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [[isLoading, session], setSession] = useStorageState("session")

  const logIn = async (credentials: Credentials) => {
    const resp = await authRepo.logIn(credentials)
    if (!resp) return { success: false }
    setSession(resp.token)
    return { success: true }
  }

  const logOut = () => {
    setSession(null)
    authRepo.logOut()
  }

  useEffect(() => {
    const mount = async () => {
      const resp = await authRepo.currentUser()
      if (resp) {
        setSession(resp.token)
      } else {
        setSession(null)
        authRepo.logOut()
      }
    }
    mount()
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        session,
        isLoading,
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
