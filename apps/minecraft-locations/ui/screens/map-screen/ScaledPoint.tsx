import { useToastController } from "@tamagui/toast"
import { TouchableOpacity } from "react-native"
import { Circle } from "tamagui"
import { Point } from "../../../interfaces/IPointRepository"

type TScaledPoint = Point & { scaledX: number; scaledZ: number }

export const ScaledPoint = ({ point }: { point: TScaledPoint }) => {
  const red = point.y >= 0 ? 255 : 255 - Math.abs(point.y)
  const blue = point.y <= 0 ? 255 : 255 - point.y
  const toast = useToastController()
  return (
    <TouchableOpacity
      onPress={() =>
        toast.show(point.label, {
          message: `X: ${point.x} Y: ${point.y} Z: ${point.z}`,
        })
      }
    >
      <Circle
        margin="30px"
        position="absolute"
        left={`${point.scaledX}px`}
        top={`${point.scaledZ}px`}
        size="$1"
        background={`rgb(${red}, 0, ${blue})`}
        transform={"translate(-50%, -50%)"}
      />
    </TouchableOpacity>
  )
}
