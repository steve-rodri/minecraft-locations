import { Alert } from "react-native";
import { supabase } from "~/lib/supabase";
import { Button, Input, Form, Label, Spinner } from "tamagui";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function LoginForm() {
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email);
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async ({
    password,
  }) => {
    const { error } = await supabase.auth.updateUser({ password });
    await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
      return;
    }
    router.replace("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} minWidth="$20">
      <>
        <Label htmlFor="email">Email</Label>
        <Input
          disabled
          bg="$colorTransparent"
          value={email}
          textContentType="emailAddress"
          placeholder="Email"
          autoCapitalize="none"
        />
      </>

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">Password</Label>
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
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              {...field}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Confirm Password"
              autoCapitalize="none"
            />
          </>
        )}
      />
      <Form.Trigger borderColor="$colorTransparent" p={0} m={0} mt="$5">
        <Button
          disabled={isLoading || isSubmitting}
          icon={isLoading || isSubmitting ? () => <Spinner /> : undefined}
          themeInverse
        >
          Create Password
        </Button>
      </Form.Trigger>
    </Form>
  );
}
