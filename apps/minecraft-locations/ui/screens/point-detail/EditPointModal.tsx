import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, X } from "@tamagui/lucide-icons"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
  Button,
  Dialog,
  Form,
  Input,
  Label,
  Spinner,
  Unspaced,
  XStack,
  YStack,
} from "tamagui"
import { z } from "zod"
import { useEditPoint } from "../../../api/points"
import { Point, PointWithServer } from "../../../interfaces/IPointRepository"
import { handleError } from '../../../lib/handleErrors';

const schema = z.object({
  id: z.number(),
  label: z
    .string()
    .min(3, { message: "Label must be at least 3 characters long" }),
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
})

export const EditPointModal = ({ point }: { point: PointWithServer }) => {
  const { mutateAsync: editPoint } = useEditPoint()

  const [success, setSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: point.id,
      label: point.label,
      x: point.x,
      y: point.y,
      z: point.z,
    },
  })

  const onSubmit: SubmitHandler<Point> = async (data) => {
    try {
      const point = await editPoint(data)
      if (point) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 1500)
      }
    } catch (error) {
      handleError({ error, shouldAlert: true })
    }
  }

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <Button theme="gray" flexGrow={1} icon={Pencil}>
          Edit Location
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quicker"
          opacity={0.8}
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
            gap="$8"
          >
            <Dialog.Title>Edit Location</Dialog.Title>

            <YStack gap="$5" px="$3">
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <XStack alignItems="center" gap="$3">
                    <Label htmlFor="name">Label</Label>
                    <Input {...field} flex={1} id="label" autoComplete="off" />
                  </XStack>
                )}
              />

              <XStack gap="$3">
                <Controller
                  name="x"
                  control={control}
                  render={({ field }) => (
                    <XStack alignItems="center" gap="$3">
                      <Label htmlFor="name">X</Label>
                      <Input
                        {...field}
                        value={field.value.toString()}
                        flex={1}
                        id="x"
                        autoComplete="off"
                        selectTextOnFocus
                        keyboardType="numeric"
                        maxWidth="$8"
                      />
                    </XStack>
                  )}
                />

                <Controller
                  name="y"
                  control={control}
                  render={({ field }) => (
                    <XStack alignItems="center" gap="$3">
                      <Label htmlFor="name">Y</Label>
                      <Input
                        {...field}
                        value={field.value.toString()}
                        flex={1}
                        id="y"
                        autoComplete="off"
                        selectTextOnFocus
                        maxWidth="$8"
                      />
                    </XStack>
                  )}
                />

                <Controller
                  name="z"
                  control={control}
                  render={({ field }) => (
                    <XStack alignItems="center" gap="$3">
                      <Label htmlFor="name">Z</Label>
                      <Input
                        {...field}
                        value={field.value.toString()}
                        flex={1}
                        id="z"
                        autoComplete="off"
                        selectTextOnFocus
                        maxWidth="$8"
                      />
                    </XStack>
                  )}
                />
              </XStack>
            </YStack>

            <XStack alignSelf="flex-end" gap="$4">
              <Form.Trigger asChild>
                <Button
                  themeInverse={!success}
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
  )
}
