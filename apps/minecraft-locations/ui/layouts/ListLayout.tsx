import { Stack } from "expo-router"
import { useColorScheme } from "react-native"
import colors from "../constants/colors"

export default function ListLayout() {
  const colorScheme = useColorScheme()
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
                ? colors.light.background
                : colors.dark.background,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  )
}
