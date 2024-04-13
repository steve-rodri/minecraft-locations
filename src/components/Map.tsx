import {
  FloatingPlacement,
  FloatingPosition,
  FloatingSide,
} from "@mantine/core"
import { ScaledPoint } from "./ScaledPoint"
import { Point } from "../data/getPoints"

export const Map = ({ points }: { points: Point[] }) => {
  // Assuming your map dimensions are known
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const buffer = 50 // Size of the buffer in pixels

  // Find the maximum and minimum values of x and z
  const maxX = Math.max(...points.map((point) => point.x))
  const minX = Math.min(...points.map((point) => point.x))
  const maxZ = Math.max(...points.map((point) => point.z))
  const minZ = Math.min(...points.map((point) => point.z))

  // Add buffer to the range of x and z
  const rangeX = maxX - minX + 2 * buffer
  const rangeZ = maxZ - minZ + 2 * buffer

  // Calculate the scaling factor for each axis based on the screen dimensions and buffer
  const scaleX = (screenWidth - 2 * buffer) / rangeX
  const scaleZ = (screenHeight - 2 * buffer) / rangeZ

  // Scale the data points with buffer
  const scaledPoints = points.map((point) => ({
    ...point,
    scaledX: (point.x - minX + buffer) * scaleX,
    scaledZ: (point.z - minZ + buffer) * scaleZ, // Using Z instead of Y
  }))

  const maxScaledX = Math.max(...scaledPoints.map((point) => point.scaledX))
  const minScaledX = Math.min(...scaledPoints.map((point) => point.scaledX))
  const maxScaledZ = Math.max(...scaledPoints.map((point) => point.scaledZ))
  const minScaledZ = Math.min(...scaledPoints.map((point) => point.scaledZ))

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "800px",
        marginTop: "20px",
      }}
    >
      {scaledPoints.map((point, index) => {
        const edgeBuffer = 50
        const [onLeftEdge, onRightEdge] = [
          point.scaledX - minScaledX < edgeBuffer,
          maxScaledX - point.scaledX < edgeBuffer,
        ]
        const [onTopEdge, onBottomEdge] = [
          point.scaledZ - minScaledZ < edgeBuffer,
          maxScaledZ - point.scaledZ < edgeBuffer,
        ]
        const popoverPlacement: FloatingPosition = (() => {
          let side: FloatingSide = "bottom"
          let placement: FloatingPlacement | undefined
          if (onLeftEdge) side = "right"
          if (onRightEdge) side = "left"
          if (onTopEdge) side = "bottom"
          if (onBottomEdge) side = "top"
          if (onLeftEdge && onTopEdge) {
            side = "right"
            placement = "start"
          }
          if (onTopEdge && onRightEdge) {
            side = "left"
            placement = "start"
          }
          if (onRightEdge && onBottomEdge) {
            side = "left"
            placement = "end"
          }
          if (onBottomEdge && onLeftEdge) {
            side = "right"
            placement = "end"
          }
          if (!placement) return side
          return `${side}-${placement}`
        })()

        return (
          <ScaledPoint
            point={point}
            key={index}
            popoverPlacement={popoverPlacement}
          />
        )
      })}
    </div>
  )
}

export default Map
