import {
  CreatePointData,
  EditPointData,
  IPointRepository,
} from "../interfaces/IPointRepository"
import { db } from "../db"
import { pointsTable } from "../db/schema"
import { eq } from "drizzle-orm"

export class PointRepository implements IPointRepository {
  async getPoint(id = 1) {
    return db.query.pointsTable.findFirst({
      columns: {
        serverId: false,
      },
      where: eq(pointsTable.id, id),
      with: {
        server: true,
      },
    })
  }

  async getPoints(serverId = 1) {
    return db.query.pointsTable.findMany({
      columns: {
        serverId: false,
      },
      where: eq(pointsTable.serverId, serverId),
      with: {
        server: true,
      },
    })
  }

  async createPoint(data: CreatePointData) {
    const point = await db.insert(pointsTable).values(data).returning()
    return this.getPoint(point[0].id)
  }

  async editPoint(data: EditPointData) {
    const { id, ...rest } = data
    const point = await db
      .update(pointsTable)
      .set(rest)
      .where(eq(pointsTable.id, id))
      .returning()
    return this.getPoint(point[0].id)
  }

  async deletePoint(id: number) {
    await db.delete(pointsTable).where(eq(pointsTable.id, id))
    return { success: true }
  }
}
