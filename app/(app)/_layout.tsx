import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Redirect, Stack } from "expo-router";
import { YStack, Text } from "tamagui";

export default function AppLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) {
    return (
      <YStack justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
