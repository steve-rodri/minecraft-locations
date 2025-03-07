import { H2, YStack, Text } from "tamagui"
import SignInForm from "./SignInForm"

export default function SignIn() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      gap="$4"
      bg="$background"
    >
      <YStack alignItems="center" gap="$1">
        <H2>Minecraft Locations</H2>
        <Text>Sign in to Minecraft Locations</Text>
      </YStack>
      <SignInForm />
    </YStack>
  )
}
