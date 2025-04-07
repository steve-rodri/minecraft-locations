import { User } from "firebase/auth"
import {
  useState,
  useCallback,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react"

import { onAuthStateChangeListener } from "../../lib/firebase"
import { FirebaseAuthRepository } from "../../repositories/FirebaseAuthRepository"

interface IAuthContext {
  initializing: boolean
  session: User | null
  authRepo: FirebaseAuthRepository
}

const AuthContext = createContext<IAuthContext>({
  initializing: true,
  session: null,
  authRepo: new FirebaseAuthRepository(),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<User | null>(null)
  const [initializing, setInitializing] = useState(true)
  const onAuthStateChanged = useCallback(async (data: User | null) => {
    setSession(data)
    setInitializing(false)
  }, [])
  useEffect(() => {
    const subscriber = onAuthStateChangeListener(onAuthStateChanged)
    return subscriber
  }, [onAuthStateChanged])

  return (
    <AuthContext.Provider
      value={{
        authRepo: new FirebaseAuthRepository(),
        initializing,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const authCtx = useContext(AuthContext)
  if (!authCtx) {
    throw Error("useAuthContext must be used within an AuthProvider")
  }

  return authCtx
}
