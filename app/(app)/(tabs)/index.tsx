import { LogOut } from "@tamagui/lucide-icons";
import { Button, View } from "tamagui";
import { supabase } from "~/lib/supabase";
import { Map } from "~/components/Map";
import { useGetPoints } from "~/data/points";
import { useServerContext } from "~/components/ServerContext";

export default function MapScreen() {
  const { selected } = useServerContext();
  const { data: points } = useGetPoints(selected?.id);

  return (
    <View flex={1} bg="$background">
      {points ? <Map points={points} /> : null}
    </View>
  );
}

const LogOutButton = () => {
  return (
    <Button size="$3" onPress={() => supabase.auth.signOut()} theme="red">
      <LogOut size="$1" />
    </Button>
  );
};
