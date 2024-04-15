import { Redirect, Stack } from "expo-router";
import { YStack, Text } from "tamagui";
import { useAuthContext } from "~/components/AuthContext";

export default function AppLayout() {
  const { session, type, loading } = useAuthContext();

  if (loading) {
    return (
      <YStack
        flex={1}
        bg="$background"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (type === "invite") {
    return <Redirect href="/create-password" />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
