import { Redirect, Slot } from "expo-router"
import { YStack, Text } from "tamagui"
import { useAuthContext } from "../context/AuthContext"

export default function AuthLayout() {
  const { session, initializing } = useAuthContext()

  if (initializing) {
    return (
      <YStack
        flex={1}
        bg="$background"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Loading...</Text>
      </YStack>
    )
  }

  if (session) {
    return <Redirect href="/" />
  }

  return <Slot />
}
