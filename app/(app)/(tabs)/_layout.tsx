import { Tabs } from "expo-router";
import { Map, List } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ServerContextProvider } from "~/components/ServerContext";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  return (
    <ServerContextProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          tabBarStyle: { height: bottom + 65 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
          }}
        />
      </Tabs>
    </ServerContextProvider>
  );
}
