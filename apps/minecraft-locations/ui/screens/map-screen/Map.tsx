import { ScaledPoint } from "./ScaledPoint";
import { Point } from "~/interfaces/IPointRepository";

export const Map = ({ points }: { points: Point[] }) => {
  // Assuming your map dimensions are known
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight * 0.7;
  const buffer = 50; // Size of the buffer in pixels

  // Find the maximum and minimum values of x and z
  const maxX = Math.max(...points.map((point) => point.x));
  const minX = Math.min(...points.map((point) => point.x));
  const maxZ = Math.max(...points.map((point) => point.z));
  const minZ = Math.min(...points.map((point) => point.z));

  // Add buffer to the range of x and z
  const rangeX = maxX - minX + 2 * buffer;
  const rangeZ = maxZ - minZ + 2 * buffer;

  // Calculate the scaling factor for each axis based on the screen dimensions and buffer
  const scaleX = (screenWidth - 2 * buffer) / rangeX;
  const scaleZ = (screenHeight - 2 * buffer) / rangeZ;

  // Scale the data points with buffer
  const scaledPoints = points.map((point) => ({
    ...point,
    scaledX: (point.x - minX + buffer) * scaleX,
    scaledZ: (point.z - minZ + buffer) * scaleZ, // Using Z instead of Y
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        marginTop: "20px",
      }}
    >
      {scaledPoints.map((point, index) => {
        return <ScaledPoint point={point} key={index} />;
      })}
    </div>
  );
};

export default Map;
