import { useState } from "react";
import { ScrollView } from "tamagui";

import { Map } from "./Map";
import { useGetPoints } from "~/api/points";
import { FAB } from "../../components/FAB";
import { Header } from "../../components/Header";
import { BottomSheet } from "../../components/BottomSheet";
import { AddPointForm } from "../../components/AddPointForm";
import { SafeAreaXView } from "../../components/SafeAreaView";
import { useServerContext } from "../../context/ServerContext";

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
