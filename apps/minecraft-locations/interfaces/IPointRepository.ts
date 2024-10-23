import {
  PayloadMutationResponse,
  PayloadDocResponse,
} from "../lib/payload.types"
import { Server } from "./IServerRepository"

export type Point = {
  id: number
  label: string
  x: number
  y: number
  z: number
}
export type PointWithServer = Point & { server: Server }

export type PointsResponse = PayloadDocResponse<PointWithServer>
export type PointCreateResponse = PayloadMutationResponse<PointWithServer>
export type PointEditResponse = PayloadMutationResponse<PointWithServer>

export type CreatePointData = Omit<Point, "id"> & { server: number }
export type EditPointData = Point

export interface IPointRepository {
  getPoint(id: number): Promise<PointWithServer | null>
  getPoints(serverId: number): Promise<PointsResponse | null>
  createPoint(args: CreatePointData): Promise<PointWithServer>
  editPoint(args: EditPointData): Promise<PointWithServer>
  deletePoint(id: number): Promise<{ success: boolean }>
}
