import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastProvider } from "@tamagui/toast"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { Platform, useColorScheme } from "react-native"
import { TamaguiProvider, View } from "tamagui"
import SecureStore from "expo-secure-store"

import { config } from "../../tamagui.config"
import "../../tamagui-web.css"
import { AuthProvider } from "../context/AuthContext"
import { CurrentToast } from "../components/CurrentToast"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "../../api/trpc"
import { API_URL } from "../../env"

export { ErrorBoundary } from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${API_URL}/trpc`,
          async headers() {
            if (Platform.OS === "web") return {}
            const token = await SecureStore.getItemAsync("accessToken")
            console.log({ token })
            return {
              Authorization: `Bearer ${token}`,
            }
          },
        }),
      ],
    }),
  )

  const colorScheme = useColorScheme()
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (interLoaded || interError) SplashScreen.hideAsync()
  }, [interLoaded, interError])

  if (!interLoaded && !interError) return null

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as string}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <ToastProvider>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <View flex={1} background="$background">
                  <Stack screenOptions={{ headerShown: false }} />
                </View>
              </AuthProvider>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </trpc.Provider>
          <CurrentToast />
        </ToastProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
