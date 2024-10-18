import { useToastController } from "@tamagui/toast";
import { TouchableOpacity } from "react-native";
import { Circle } from "tamagui";
import { Point } from "~/api/points";

type ScaledPoint = Point & { scaledX: number; scaledZ: number };

export const ScaledPoint = ({ point }: { point: ScaledPoint }) => {
  const red = point.y >= 0 ? 255 : 255 - Math.abs(point.y);
  const blue = point.y <= 0 ? 255 : 255 - point.y;
  const toast = useToastController();
  return (
    <TouchableOpacity
      onPress={() =>
        toast.show(point.label, {
          message: `X: ${point.x} Y: ${point.y} Z: ${point.z}`,
        })
      }
    >
      <Circle
        m="30px"
        pos="absolute"
        left={`${point.scaledX}px`}
        top={`${point.scaledZ}px`}
        size="$1"
        bg={`rgb(${red}, 0, ${blue})`}
        transform={"translate(-50%, -50%)"}
      />
    </TouchableOpacity>
  );
};
