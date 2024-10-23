import { CreatePointData, EditPointData, IPointRepository } from '../interfaces/IPointRepository';

export class PointRepository implements IPointRepository {
  async getPoint(id = 1) {}

  async getPoints(serverId = 1) {
    return []
  }

  async createPoint(point: CreatePointData) {}

  async editPoint(point: EditPointData) {}

  async deletePoint(id: number) {}
}
