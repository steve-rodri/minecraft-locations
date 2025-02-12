import { useState, useEffect } from "react"
import { Platform } from "react-native"
import * as SecureStore from "expo-secure-store"
import { AuthRepository } from "../repositories/AuthRepository"

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      if (Platform.OS === "web") {
        try {
          const authRepo = new AuthRepository()
          const response = await authRepo.getSession()
          if (!response) return
          setIsAuthenticated(response.isAuthenticated)
        } catch {
          setIsAuthenticated(false)
        }
      } else {
        // 🔹 Mobile: Check JWT in SecureStore
        const token = await SecureStore.getItemAsync("accessToken")
        setIsAuthenticated(!!token)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  return { isAuthenticated, isLoading }
}
