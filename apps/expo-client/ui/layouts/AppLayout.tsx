import { Redirect, Stack } from "expo-router"
import { YStack, Text } from "tamagui"
import { useAuthContext } from "../context/AuthContext"

export default function AppLayout() {
  const { session, initializing } = useAuthContext()

  if (initializing) {
    return (
      <YStack
        flex={1}
        // @ts-ignore
        bg="$background"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Loading...</Text>
      </YStack>
    )
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
