import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Form,
  Input,
  Label,
  Sheet,
  Spinner,
  Unspaced,
  XStack,
} from "tamagui";
import { z } from "zod";
import { Point, useEditPoint } from "~/data/points";
import { Server } from "~/data/servers";

const schema = z.object({
  label: z
    .string()
    .min(3, { message: "Label must be at least 3 characters long" }),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  // server_id: z.number().optional(),
});

export const EditPointModal = ({
  point,
}: {
  point: Point & { server: Server | null };
}) => {
  const { mutateAsync: editPoint } = useEditPoint();

  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: point.id,
      label: point.label,
      x: point.x,
      y: point.y,
      z: point.z,
    },
  });

  const onSubmit: SubmitHandler<Point> = async (data) => {
    const point = await editPoint(data);
    if (point) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  return (
    <Dialog modal>
      <Dialog.Trigger bg="$colorTransparent" borderColor="$colorTransparent">
        <Button theme="gray" flexGrow={1}>
          Edit Location
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
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Dialog.Title>Edit Location</Dialog.Title>

            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <Fieldset gap="$4" horizontal borderColor="$colorTransparent">
                  <Label htmlFor="name">Label</Label>
                  <Input {...field} flex={1} id="label" autoComplete="off" />
                </Fieldset>
              )}
            />

            <Controller
              name="x"
              control={control}
              render={({ field }) => (
                <Fieldset gap="$4" horizontal borderColor="$colorTransparent">
                  <Label htmlFor="name">X</Label>
                  <Input
                    {...field}
                    value={field.value.toString()}
                    flex={1}
                    id="x"
                    autoComplete="off"
                  />
                </Fieldset>
              )}
            />

            <Controller
              name="y"
              control={control}
              render={({ field }) => (
                <Fieldset gap="$4" horizontal borderColor="$colorTransparent">
                  <Label htmlFor="name">Y</Label>
                  <Input
                    {...field}
                    value={field.value.toString()}
                    flex={1}
                    id="y"
                    autoComplete="off"
                  />
                </Fieldset>
              )}
            />

            <Controller
              name="z"
              control={control}
              render={({ field }) => (
                <Fieldset gap="$4" horizontal borderColor="$colorTransparent">
                  <Label htmlFor="name">Z</Label>
                  <Input
                    {...field}
                    value={field.value.toString()}
                    flex={1}
                    id="z"
                    autoComplete="off"
                  />
                </Fieldset>
              )}
            />

            <XStack alignSelf="flex-end" gap="$4">
              <Form.Trigger
                borderColor="$colorTransparent"
                bg="$colorTransparent"
              >
                <Button
                  theme={success ? "green" : "active"}
                  disabled={isSubmitting || isLoading}
                  icon={
                    isSubmitting || isLoading ? () => <Spinner /> : undefined
                  }
                >
                  Save changes
                </Button>
              </Form.Trigger>
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
        </Form>
      </Dialog.Portal>
    </Dialog>
  );
};
