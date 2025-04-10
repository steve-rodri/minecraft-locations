import { ChevronDown } from "@tamagui/lucide-icons"
import { Sheet } from "@tamagui/sheet"
import { ReactNode } from "react"
import { Button, H2, XStack } from "tamagui"

export const BottomSheet = ({
  open,
  setOpen,
  children,
  title,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  children?: ReactNode
}) => {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      snapPoints={[65, 45]}
      dismissOnSnapToBottom
      zIndex={100_000}
      animation="quick"
    >
      <Sheet.Overlay
        animation="quicker"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame padding="$6" alignItems="center" space="$5">
        <XStack alignItems="flex-start" justifyContent="space-between" w="100%">
          <H2>{title}</H2>
          <Button
            size="$5"
            circular
            icon={ChevronDown}
            onPress={() => setOpen(false)}
          />
        </XStack>
        {children}
      </Sheet.Frame>
    </Sheet>
  )
}
