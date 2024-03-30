import {
  Popover,
  PopoverTarget,
  PopoverDropdown,
  Box,
  Text,
  Group,
  FloatingPosition,
} from "@mantine/core"
import { Point } from "./points"
import { useState } from "react"

type ScaledPoint = Point & { scaledX: number; scaledZ: number }

export const ScaledPoint = ({
  point,
  popoverPlacement = "bottom",
}: {
  point: ScaledPoint
  popoverPlacement: FloatingPosition
}) => {
  const [opened, setOpened] = useState(false)
  const red = point.y >= 0 ? 255 : 255 - Math.abs(point.y)
  const blue = point.y <= 0 ? 255 : 255 - point.y
  if (point.label === "Spawn") console.log({ red, blue })
  return (
    <Popover withArrow opened={opened} position={popoverPlacement}>
      <PopoverTarget>
        <div
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          style={{
            margin: "30px",
            position: "absolute",
            left: `${point.scaledX}px`,
            top: `${point.scaledZ}px`, // Using Z coordinate for top position
            width: "12px",
            height: "12px",
            backgroundColor: `rgb(${red}, 0, ${blue})`, // Customize color as needed
            borderRadius: "50%",
            transform: "translate(-50%, -50%)", // Center the circle on its position
          }}
        />
      </PopoverTarget>
      <PopoverDropdown>
        <Box>
          <Text>{point.label}</Text>
          <Group gap="xs">
            <Text>X: {point.x}</Text>
            <Text>Y: {point.y}</Text>
            <Text>Z: {point.z}</Text>
          </Group>
        </Box>
      </PopoverDropdown>
    </Popover>
  )
}
