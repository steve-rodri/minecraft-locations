import { Alert } from "react-native"
import { Button, Input, Form, Label, Spinner } from "tamagui"
import { z } from "zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { authRepo } from "../../../repositories/index"
import { handleError } from "../../../lib/handleErrors"

const schema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const [success, setSuccess] = useState(false)
  const authCtx = useAuthContext()

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async ({
    newPassword,
  }) => {
    try {
      const { success } = await authRepo.resetPassword({
        password: newPassword,
        token: authCtx.session ?? "",
      })
      if (!success) {
        Alert.alert(
          "Error",
          "You must be logged in to change your password, try refreshing.",
        )
        return
      }
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        if (router.canGoBack()) router.back()
        else router.replace("/")
      }, 1500)
    } catch (error) {
      handleError({ error, shouldAlert: true })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} minWidth="$20">
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">Current</Label>
            <Input
              {...field}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Password"
              autoCapitalize="none"
            />
          </>
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">New Password</Label>
            <Input
              {...field}
              secureTextEntry={true}
              textContentType="password"
              placeholder="New Password"
              autoCapitalize="none"
            />
          </>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">Confirm New Password</Label>
            <Input
              {...field}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Confirm New Password"
              autoCapitalize="none"
            />
          </>
        )}
      />
      <Form.Trigger asChild>
        <Button
          themeInverse={!success}
          theme={success ? "green" : "dark"}
          disabled={isLoading || isSubmitting}
          icon={isLoading || isSubmitting ? () => <Spinner /> : undefined}
          mt="$5"
        >
          {success ? "Password Changed!" : "Change Password"}
        </Button>
      </Form.Trigger>
    </Form>
  )
}
