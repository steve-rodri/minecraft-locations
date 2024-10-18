import { H2, YStack, Text } from "tamagui";
import CreatePasswordForm from "../components/CreatePasswordForm";

export default function CreatePassword() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
      <YStack alignItems="center" gap="$1">
        <H2>Minecraft Locations</H2>
        <Text>Create Your Password</Text>
      </YStack>
      <CreatePasswordForm />
    </YStack>
  );
}
