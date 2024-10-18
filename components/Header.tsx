import { YStack, H2, XStack, View } from "tamagui";
import { ServerSelect } from "./ServerSelect";
import { AccountModal } from "./AccountModal";
import { ToastViewport } from "@tamagui/toast";

export const Header = () => {
  return (
    <>
      <YStack bg="$background" alignItems="center" py="$5" gap="$4">
        <XStack
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          gap="$2"
          px="$4"
        >
          <View w="$1" />
          <H2 fontSize="$8" $gtXs={{ fontSize: "$9" }}>
            Minecraft Locations
          </H2>
          <View w="$1" alignItems="flex-end">
            <AccountModal />
          </View>
        </XStack>
        <XStack alignItems="center" gap="$2" justifyContent="center" w="100%">
          <ServerSelect />
        </XStack>
      </YStack>
      <ToastViewport
        pos="relative"
        top={140}
        flexDirection="column-reverse"
        multipleToasts={false}
      />
    </>
  );
};
