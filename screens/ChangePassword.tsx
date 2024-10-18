import { H2, YStack, Text } from "tamagui";
import ChangePasswordForm from "~/components/ChangePasswordForm";

export default function ChangePassword() {
  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
      <YStack alignItems="center" gap="$1">
        <H2>Minecraft Locations</H2>
        <Text>Change Your Password</Text>
      </YStack>
      <ChangePasswordForm />
    </YStack>
  );
}
