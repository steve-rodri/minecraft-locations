import z from "zod"
import { serverSchema } from "./IServerRepository"

export const pointSchema = z.object({
  id: z.number(),
  label: z.string(),
  x: z.number(),
  y: z.number(),
  z: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export const pointWithServerSchema = pointSchema.extend({
  server: serverSchema,
})

export const createPointSchema = pointSchema
  .omit({ id: true })
  .extend({ serverId: z.number() })

export const editPointSchema = pointSchema
  .partial({
    label: true,
    x: true,
    y: true,
    z: true,
  })
  .extend({ serverId: z.number().optional() })

export type Point = z.infer<typeof pointSchema>
export type PointWithServer = z.infer<typeof pointWithServerSchema>

export type CreatePointData = z.infer<typeof createPointSchema>
export type EditPointData = z.infer<typeof editPointSchema>

export interface IPointRepository {
  getPoint(id?: number): Promise<PointWithServer | undefined>
  getPoints(serverId: number): Promise<PointWithServer[]>
  createPoint(args: CreatePointData): Promise<PointWithServer | undefined>
  editPoint(args: EditPointData): Promise<PointWithServer | undefined>
  deletePoint(id: number): Promise<{ success: boolean }>
}
