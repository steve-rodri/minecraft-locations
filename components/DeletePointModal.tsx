import { X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Adapt, Button, Dialog, Sheet, Unspaced, XStack } from "tamagui";
import { Point, useDeletePoint } from "~/data/points";
import { Server } from "~/data/servers";

export const DeletePointModal = ({
  point,
}: {
  point: Point & { server: Server | null };
}) => {
  const { mutate: deletePoint, error } = useDeletePoint();

  return (
    <Dialog modal>
      <Dialog.Trigger bg="$colorTransparent" borderColor="$colorTransparent">
        <Button theme="red" flexGrow={1}>
          Delete Location
        </Button>
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Delete Location</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this location?
          </Dialog.Description>

          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close>
              <Button
                theme="red"
                onPress={() => {
                  console.log("works");
                  deletePoint(point.id);
                  router.back();
                }}
              >
                Yes
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button theme="active">No</Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
