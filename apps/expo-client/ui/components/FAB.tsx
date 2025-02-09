import { Plus } from "@tamagui/lucide-icons"
import { Button } from "tamagui"

export const FAB = ({ onPress }: { onPress: () => void }) => {
  return (
    <Button
      onPress={onPress}
      circular
      themeInverse
      elevation="$4"
      size="$5"
      pos="absolute"
      bottom={20}
      right={20}
    >
      <Plus />
    </Button>
  )
}
