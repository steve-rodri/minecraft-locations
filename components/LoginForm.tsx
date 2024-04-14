import { Alert } from "react-native";
import { supabase } from "~/lib/supabase";
import { Button, Input, Form, Label, Spinner } from "tamagui";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm() {
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
      <Form.Trigger borderColor="$colorTransparent" p={0} m={0} mt="$5">
        <Button
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
