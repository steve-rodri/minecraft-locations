import { Tabs } from "expo-router";
import { Map, List } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FAB } from "~/components/FAB";
import { BottomSheet } from "~/components/BottomSheet";
import { useState } from "react";
import { ServerContextProvider } from "~/components/ServerContext";
import { ServerSelect } from "~/components/ServerSelect";
import { H2, H5, XStack, YStack } from "tamagui";
import { AddPointForm } from "~/components/AddPointForm";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  return (
    <ServerContextProvider>
      <YStack
        bg="$background"
        alignItems="center"
        justifyContent="center"
        py="$5"
        gap="$3"
      >
        <H2>Minecraft Locations</H2>
        <XStack alignItems="center" gap="$2" mr="$9">
          <H5 textTransform="capitalize">Server:</H5>
          <ServerSelect />
        </XStack>
      </YStack>
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
      <FAB onPress={() => setOpen(true)} />
      <BottomSheet open={open} setOpen={setOpen} title="Add Location">
        <AddPointForm />
      </BottomSheet>
    </ServerContextProvider>
  );
}
