import { Redirect, Stack } from "expo-router"
import { YStack, Text } from "tamagui"
import { useAuthContext } from "../context/AuthContext"

export default function AppLayout() {
  const { session, isLoading } = useAuthContext()

  if (isLoading) {
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

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
