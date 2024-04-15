import { router } from "expo-router";
import { ChevronRight, MapPin } from "@tamagui/lucide-icons";
import { H2, ListItem, ScrollView, Separator, View, YGroup } from "tamagui";
import { useServerContext } from "~/components/ServerContext";
import { Header } from "~/components/Header";
import { Point, useGetPoints } from "~/data/points";
import { FAB } from "~/components/FAB";
import { BottomSheet } from "~/components/BottomSheet";
import { AddPointForm } from "~/components/AddPointForm";
import { useState } from "react";

export default function ListScreen() {
  const ctx = useServerContext();
  const { data: points } = useGetPoints(ctx.selected?.id);
  const [open, setOpen] = useState(false);
  return (
    <>
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
    </>
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
