import { ScrollText } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  H2,
  H3,
  View,
  Text,
  YStack,
  XStack,
  H4,
  Button,
  ScrollView,
} from "tamagui";
import { DeletePointModal } from "~/components/DeletePointModal";
import { EditPointModal } from "~/components/EditPointModal";
import { useGetPoint } from "~/data/points";

export default function PointDetail() {
  const { id } = useLocalSearchParams();
  const { data: point, isLoading } = useGetPoint(
    Number(Array.isArray(id) ? id[0] : id)
  );

  if (isLoading) {
    return (
      <View
        flex={1}
        bg="$background"
        alignItems="center"
        justifyContent="center"
      >
        <H3>Loading...</H3>
      </View>
    );
  }

  if (!point)
    return (
      <View
        flex={1}
        bg="$background"
        alignItems="center"
        justifyContent="center"
      >
        <H3>Unable to fetch data for this location</H3>
      </View>
    );

  return (
    <YStack flex={1} bg="$background" px="$4" gap="$6">
      <ScrollView>
        <YStack my="$3" gap="$1">
          <H2>{point.label}</H2>
          {point.server ? <Text>Server: {point.server.name}</Text> : null}
        </YStack>
        <YStack gap="$9">
          <XStack alignItems="center" gap="$3">
            <H4 fontSize="$11">X:</H4>
            <H3 fontSize="$12">{point.x}</H3>
          </XStack>
          <XStack alignItems="center" gap="$3">
            <H4 fontSize="$11">Y:</H4>
            <H3 fontSize="$12">{point.y}</H3>
          </XStack>
          <XStack alignItems="center" gap="$3">
            <H4 fontSize="$11">Z:</H4>
            <H3 fontSize="$12">{point.z}</H3>
          </XStack>
        </YStack>

        <XStack gap="$4" mt="$4">
          <EditPointModal point={point} />
          <DeletePointModal point={point} />
        </XStack>
      </ScrollView>
    </YStack>
  );
}
