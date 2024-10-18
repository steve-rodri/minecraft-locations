import { Trash, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, Dialog, Unspaced, XStack } from "tamagui";
import { useDeletePoint } from "~/api/points";
import { Server } from "~/interfaces/IServerRepository";
import { Point } from "~/interfaces/IPointRepository";

export const DeletePointModal = ({
  point,
}: {
  point: Point & { server: Server | null };
}) => {
  const { mutateAsync: deletePoint } = useDeletePoint();

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button theme="red" flexGrow={1} icon={Trash} variant="outlined">
          Delete Location
        </Button>
      </Dialog.Trigger>

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
            <Dialog.Close asChild>
              <Button
                size="$5"
                theme="red"
                variant="outlined"
                onPress={async () => {
                  const resp = await deletePoint(point.id);
                  if (resp.success) router.back();
                }}
              >
                Yes
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button theme="active" size="$5">
                No
              </Button>
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
