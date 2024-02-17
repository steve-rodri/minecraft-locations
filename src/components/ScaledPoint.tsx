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
  return (
    <Popover
      withArrow
      opened={opened}
      onChange={setOpened}
      position={popoverPlacement}
    >
      <PopoverTarget>
        <div
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          style={{
            position: "absolute",
            left: `${point.scaledX}px`,
            top: `${point.scaledZ}px`, // Using Z coordinate for top position
            width: "12px",
            height: "12px",
            backgroundColor: "red", // Customize color as needed
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
