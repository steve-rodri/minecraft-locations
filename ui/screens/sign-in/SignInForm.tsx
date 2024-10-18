import { Alert } from "react-native";
import { Button, Input, Form, Label, Spinner } from "tamagui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { router } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "~/lib/supabase";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { isLoading, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    router.replace("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} minWidth="$20">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="email">Email</Label>
            <Input
              {...field}
              placeholder="email@address.com"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <>
            <Label htmlFor="password">Password</Label>
            <Input
              {...field}
              textContentType="password"
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
            />
          </>
        )}
      />
      <Form.Trigger asChild>
        <Button
          mt="$5"
          disabled={isLoading || isSubmitting}
          icon={isLoading || isSubmitting ? () => <Spinner /> : undefined}
          themeInverse
        >
          Sign In
        </Button>
      </Form.Trigger>
    </Form>
  );
}
