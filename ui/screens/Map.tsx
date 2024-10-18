import { ScrollView } from "tamagui";
import { Map } from "~/components/Map";
import { Header } from "~/components/Header";
import { useGetPoints } from "~/api/points";
import { useServerContext } from "~/context/ServerContext";
import { FAB } from "~/components/FAB";
import { BottomSheet } from "~/components/BottomSheet";
import { AddPointForm } from "~/components/AddPointForm";
import { useState } from "react";
import { SafeAreaXView } from "~/components/SafeAreaView";

export default function MapScreen() {
  const { selected } = useServerContext();
  const { data: points } = useGetPoints(selected?.id);
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaXView flex={1} bg="$background">
      <Header />
      <ScrollView>{points ? <Map points={points} /> : null}</ScrollView>

      <FAB onPress={() => setOpen(true)} />
      <BottomSheet open={open} setOpen={setOpen} title="Add Location">
        <AddPointForm />
      </BottomSheet>
    </SafeAreaXView>
  );
}
