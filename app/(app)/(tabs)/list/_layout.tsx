import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "~/constants/Colors";

export default function ListLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="point/[id]"
        options={{
          title: "",
          headerStyle: {
            backgroundColor:
              colorScheme === "light"
                ? Colors.light.background
                : Colors.dark.background,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
