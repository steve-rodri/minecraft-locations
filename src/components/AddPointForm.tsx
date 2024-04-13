import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Point } from "../data/getPoints"
import { Button, NumberInput, Stack, TextInput, Title } from "@mantine/core"
import { Server } from "../data/getServers"
import { createPoint } from "../data/createPoint"

export const AddPointForm = ({ server }: { server?: Server }) => {
  const { control, handleSubmit } = useForm({
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
            <TextInput {...field} label="label" placeholder="Spawn" />
          )}
        />
        <Controller
          name="x"
          control={control}
          render={({ field }) => <NumberInput {...field} label="x" />}
        />
        <Controller
          name="y"
          control={control}
          render={({ field }) => <NumberInput {...field} label="y" />}
        />
        <Controller
          name="z"
          control={control}
          render={({ field }) => <NumberInput {...field} label="z" />}
        />
        <Button fullWidth type="submit">
          Add Point
        </Button>
      </Stack>
    </form>
  )
}
