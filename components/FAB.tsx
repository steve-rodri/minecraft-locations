import { Plus } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Button } from "tamagui";

export const FAB = ({ onPress }: { onPress: () => void }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Button
      onPress={onPress}
      circular
      themeInverse
      elevation="$4"
      size="$5"
      pos="absolute"
      bottom={bottom + 65 + 20}
      right={20}
    >
      <Plus />
    </Button>
  );
};
