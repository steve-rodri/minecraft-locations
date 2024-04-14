import { router } from "expo-router";
import { ChevronRight, MapPin } from "@tamagui/lucide-icons";
import { H2, ListItem, ScrollView, Separator, View, YGroup } from "tamagui";
import { useServerContext } from "~/components/ServerContext";
import { Point, useGetPoints } from "~/data/points";

export default function ListScreen() {
  const ctx = useServerContext();
  const { data: points } = useGetPoints(ctx.selected?.id);
  return (
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
