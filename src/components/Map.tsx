import { Group, Box, Text } from "@mantine/core"
import { points } from "./points"

export const Map = () => {
  // Assuming your map dimensions are known
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const buffer = 50 // Size of the buffer in pixels

  // Find the maximum and minimum values of x, z, and Z
  const maxX = Math.max(...points.map((point) => point.x))
  const minX = Math.min(...points.map((point) => point.x))
  const maxZ = Math.max(...points.map((point) => point.z))
  const minZ = Math.min(...points.map((point) => point.z))

  // Add buffer to the range of x, z, and Z
  const rangeX = maxX - minX + 2 * buffer
  const rangeZ = maxZ - minZ + 2 * buffer

  // Calculate the scaling factor for each axis based on the screen dimensions and buffer
  const scaleX = (screenWidth - 2 * buffer) / rangeX
  const scaleZ = (screenHeight - 2 * buffer) / rangeZ

  // Scale the data points with buffer
  const scaledPoints = points.map((point) => ({
    ...point,
    scaledX: (point.x - minX + buffer) * scaleX,
    scaledY: (point.x - minX + buffer) * scaleX,
    scaledZ: (point.z - minZ + buffer) * scaleZ, // Using Z instead of Y
  }))

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "800px",
        backgroundColor: "#606060",
        marginTop: "20px",
      }}
    >
      {scaledPoints.map((point, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${point.scaledX}px`,
            top: `${point.scaledZ}px`, // Using Z coordinate for top position
            width: "10px",
            height: "10px",
            backgroundColor: "red", // Customize color as needed
            borderRadius: "50%",
            transform: "translate(-50%, -50%)", // Center the circle on its position
          }}
        >
          <Box w="200px">
            {/* Optionally, you can display labels or additional information */}
            <Text mt="md">{point.label}</Text>
            <Group gap="xs">
              <Text>X: {point.x}</Text>
              <Text>Y: {point.y}</Text>
              <Text>Z: {point.z}</Text>
            </Group>
          </Box>
        </div>
      ))}
    </div>
  )
}

export default Map
