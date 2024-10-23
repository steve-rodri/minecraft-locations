import { useLocalSearchParams } from "expo-router"
import { H2, H3, View, Text, YStack, XStack, H4 } from "tamagui"
import { DeletePointModal } from "./DeletePointModal"
import { EditPointModal } from "./EditPointModal"
import { SafeAreaXView } from "../../components/SafeAreaView"
import { useServerContext } from "../../context/ServerContext"
import { useGetPoint } from "../../../api/points"

export default function PointDetail() {
  const { id } = useLocalSearchParams()
  const serverCtx = useServerContext()
  const { data: point, isLoading } = useGetPoint(
    Number(Array.isArray(id) ? id[0] : id),
    serverCtx.selected,
  )

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
    )
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
    )

  return (
    <SafeAreaXView flex={1} bg="$background">
      <YStack
        flex={1}
        bg="$background"
        px="$4"
        pb="$4"
        justifyContent="space-between"
      >
        <YStack gap="$6">
          <YStack mb="$3" gap="$3">
            <H2>{point.label}</H2>
            {point.server ? (
              <Text color="gray">Server: {point.server.name}</Text>
            ) : null}
          </YStack>

          <XStack gap="$4" alignItems="center">
            <XStack alignItems="center" gap="$2">
              <H4 fontSize="$5" color="gray">
                X:
              </H4>
              <H3 fontSize="$9">{point.x}</H3>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <H4 fontSize="$5" color="gray">
                Y:
              </H4>
              <H3 fontSize="$9">{point.y}</H3>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <H4 fontSize="$5" color="gray">
                Z:
              </H4>
              <H3 fontSize="$9">{point.z}</H3>
            </XStack>
          </XStack>
        </YStack>

        <XStack gap="$4" mt="$4">
          <EditPointModal point={point} />
          <DeletePointModal point={point} />
        </XStack>
      </YStack>
    </SafeAreaXView>
  )
}
