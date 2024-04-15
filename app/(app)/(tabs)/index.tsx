import { View } from "tamagui";
import { Map } from "~/components/Map";
import { Header } from "~/components/Header";
import { useGetPoints } from "~/data/points";
import { useServerContext } from "~/components/ServerContext";
import { FAB } from "~/components/FAB";
import { BottomSheet } from "~/components/BottomSheet";
import { AddPointForm } from "~/components/AddPointForm";
import { useState } from "react";

export default function MapScreen() {
  const { selected } = useServerContext();
  const { data: points } = useGetPoints(selected?.id);
  const [open, setOpen] = useState(false);

  return (
    <View flex={1} bg="$background">
      <Header />
      {points ? <Map points={points} /> : null}

      <FAB onPress={() => setOpen(true)} />
      <BottomSheet open={open} setOpen={setOpen} title="Add Location">
        <AddPointForm />
      </BottomSheet>
    </View>
  );
}
