import {
  CreatePointData,
  EditPointData,
  IPointRepository,
  PointCreateResponse,
  PointsResponse,
  PointWithServer,
} from "../interfaces/IPointRepository"
import axios, { AxiosInstance } from "axios"

export class PointRepository implements IPointRepository {
  private axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async getPoint(id = 1) {
    const response = await this.axios.get<PointWithServer | null>(
      `/locations/${id}`
    )
    return response.data
  }

  async getPoints(serverId = 1) {
    const response = await this.axios.get<PointsResponse | null>(
      `/locations?server_id=${serverId}`
    )
    return response.data
  }

  async createPoint(data: CreatePointData) {
    const response = await this.axios.post<PointCreateResponse>(
      `/locations`,
      data
    )
    return response.data.doc
  }

  async editPoint(data: EditPointData) {
    const response = await this.axios.put<PointsResponse | null>(
      `/locations/${data.id}`,
      data
    )
    return response.data
  }

  async deletePoint(id: number) {
    const response = await this.axios.delete(`/locations/${id}`)
    return response.data
  }
}
