import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Point } from "../data/getPoints"
import { Button, NumberInput, Stack, TextInput, Title } from "@mantine/core"
import { Server } from "../data/getServers"
import { createPoint } from "../data/createPoint"
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

const schema = z.object({
  label: z.string().min(3),
  x: z.number(),
  y: z.number(),
  z: z.number(),
})

export const AddPointForm = ({ server }: { server?: Server }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      label: "",
      x: 0,
      y: 0,
      z: 0,
    },
  })

  const onSubmit: SubmitHandler<Point> = async (data) => {
    if (!server) return
    await createPoint({ ...data, server_id: server.id })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Title order={2}>Add a New Point</Title>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="label"
              placeholder="Spawn"
              error={errors.label?.message}
            />
          )}
        />
        <Controller
          name="x"
          control={control}
          render={({ field }) => (
            <NumberInput {...field} label="x" error={errors.x?.message} />
          )}
        />
        <Controller
          name="y"
          control={control}
          render={({ field }) => (
            <NumberInput {...field} label="y" error={errors.y?.message} />
          )}
        />
        <Controller
          name="z"
          control={control}
          render={({ field }) => (
            <NumberInput {...field} label="z" error={errors.z?.message} />
          )}
        />
        <Button fullWidth type="submit" mt="lg">
          Add Point
        </Button>
      </Stack>
    </form>
  )
}
