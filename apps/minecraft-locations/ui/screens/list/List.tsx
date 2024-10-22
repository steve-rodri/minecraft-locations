import { useState } from "react";
import { router } from "expo-router";
import { ChevronRight, MapPin } from "@tamagui/lucide-icons";
import { ListItem, ScrollView, Separator, View, YGroup } from "tamagui";

import { useGetPoints } from "~/api/points";
import { Point } from "~/interfaces/IPointRepository";
import { AddPointForm } from "../../components/AddPointForm";
import { BottomSheet } from "../../components/BottomSheet";
import { FAB } from "../../components/FAB";
import { Header } from "../../components/Header";
import { SafeAreaXView } from "../../components/SafeAreaView";
import { useServerContext } from "../../context/ServerContext";

export default function ListScreen() {
  const ctx = useServerContext();
  const { data: points } = useGetPoints(ctx.selected?.id);
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaXView bg="$background" flex={1}>
      <Header />
      <View flex={1} alignItems="center" bg="$background">
        <ScrollView w="100%" showsVerticalScrollIndicator={false}>
          <YGroup w="100%" separator={<Separator />}>
            {points?.map((point, i) => (
              <YGroup.Item key={i}>
                <Item point={point} />
              </YGroup.Item>
            ))}
          </YGroup>
        </ScrollView>
      </View>
      <FAB onPress={() => setOpen(true)} />
      <BottomSheet open={open} setOpen={setOpen} title="Add Location">
        <AddPointForm />
      </BottomSheet>
    </SafeAreaXView>
  );
}

const Item = ({ point }: { point: Point }) => {
  return (
    <ListItem
      icon={MapPin}
      iconAfter={ChevronRight}
      size="$4"
      title={point.label}
      subTitle={`X: ${point.x}  Y: ${point.y}  Z: ${point.z}`}
      hoverTheme
      pressTheme
      onPress={() => router.push(`/list/point/${point.id}`)}
    />
  );
};
