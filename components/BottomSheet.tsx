import { ChevronDown } from "@tamagui/lucide-icons";
import { Sheet } from "@tamagui/sheet";
import { ReactNode } from "react";
import { Button, H2, XGroup, XStack } from "tamagui";

export const BottomSheet = ({
  open,
  setOpen,
  children,
  title,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal
      open={open}
      onOpenChange={setOpen}
      snapPoints={["50%"]}
      snapPointsMode="fit"
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

      <Sheet.Frame
        padding="$6"
        // justifyContent="center"
        alignItems="center"
        space="$5"
        position="relative"
      >
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
  );
};
