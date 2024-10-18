import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Stack,
  Input,
  Form,
  Label,
  XStack,
  Spinner,
  YStack,
} from "tamagui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Point, useCreatePoint } from "~/api/points";
import { useServerContext } from "~/context/ServerContext";
import { ServerSelect } from "./ServerSelect";

const schema = z.object({
  label: z
    .string()
    .min(3, { message: "Label must be at least 3 characters long" }),
  x: z.coerce.number(),
  y: z.coerce.number(),
  z: z.coerce.number(),
});

export const AddPointForm = () => {
  const { selected: server } = useServerContext();
  const { mutateAsync: createPoint } = useCreatePoint();
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      label: "",
      x: 0,
      y: 0,
      z: 0,
    },
  });

  const onSubmit: SubmitHandler<Omit<Point, "id">> = async (data) => {
    if (!server) return;
    const point = await createPoint({ ...data, server_id: server.id });
    if (point) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="$5">
        <XStack gap="$2" w="100%">
          <Label>Server: </Label>
          <ServerSelect />
        </XStack>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <YStack>
              <XStack gap="$2" w="100%">
                <Label>Label:</Label>
                <Input {...field} placeholder="Spawn" width="100%" />
              </XStack>
              {errors.label?.message && (
                <Label color="red">{errors.label.message}</Label>
              )}
            </YStack>
          )}
        />
        <XStack gap="$3">
          <Controller
            name="x"
            control={control}
            render={({ field }) => (
              <XStack gap="$2">
                <Label>X:</Label>
                <Input
                  {...field}
                  value={field.value.toString()}
                  maxWidth="$8"
                  selectTextOnFocus
                  keyboardType="numeric"
                />
              </XStack>
            )}
          />
          <Controller
            name="y"
            control={control}
            render={({ field }) => (
              <XStack gap="$2">
                <Label>Y:</Label>
                <Input
                  {...field}
                  value={field.value.toString()}
                  maxWidth="$8"
                  selectTextOnFocus
                  keyboardType="numeric"
                />
              </XStack>
            )}
          />
          <Controller
            name="z"
            control={control}
            render={({ field }) => (
              <XStack gap="$2">
                <Label>Z:</Label>
                <Input
                  {...field}
                  value={field.value.toString()}
                  maxWidth="$8"
                  selectTextOnFocus
                  keyboardType="numeric"
                />
              </XStack>
            )}
          />
        </XStack>
        <Form.Trigger asChild>
          <Button
            mt="lg"
            themeInverse={!success}
            theme={success ? "green" : "dark"}
            disabled={isSubmitting || isLoading}
            icon={isSubmitting || isLoading ? <Spinner /> : undefined}
          >
            {success ? "Location Created!" : "Create Location"}
          </Button>
        </Form.Trigger>
      </Stack>
    </Form>
  );
};
