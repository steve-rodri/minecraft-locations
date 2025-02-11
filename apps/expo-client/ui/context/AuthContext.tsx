import { createContext, ReactNode, useContext, useEffect } from "react"
import { useStorageState } from "../../hooks/useSessionState"
import Session from "supertokens-web-js/recipe/session"

import { authRepo } from "../../repositories/index"
import { Credentials } from "../../interfaces/IAuthRepository"
import { STUser } from "../../repositories/supertokens/schemas"

const AuthContext = createContext<{
  logIn: (values: Credentials) => Promise<{ success: boolean }>
  logOut: () => void
  session?: string | null
  user?: STUser
  isLoading: boolean
} | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [[isLoading, session], setSession] = useStorageState("session")

  const logIn = async (credentials: Credentials) => {
    const user = await authRepo.signIn(credentials)
    if (!user) return { success: false }
    // ✅ Ensure the session is refreshed before retrieving the token
    await Session.attemptRefreshingSession()
    const token = await Session.getAccessToken()
    console.log({ token })
    if (!token) return { success: false }
    setSession(token)
    return { success: true }
  }

  const logOut = () => {
    setSession(null)
    authRepo.signOut()
  }

  useEffect(() => {
    const mount = async () => {
      const token = await Session.getAccessToken()
      if (token) {
        setSession(token)
      } else {
        setSession(null)
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
