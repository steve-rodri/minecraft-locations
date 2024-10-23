import {
  CreatePointData,
  EditPointData,
  IPointRepository,
} from "../interfaces/IPointRepository"
import axios, { AxiosInstance } from "axios"

export class PointRepository implements IPointRepository {
  private axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async getPoint(id = 1) {
    const response = await this.axios.get(`/locations/${id}`)
    return response.data
  }

  async getPoints(serverId = 1) {
    const response = await this.axios.get(`/locations?server_id=${serverId}`)
    return response.data
  }

  async createPoint(data: CreatePointData) {
    const response = await this.axios.post(`/locations`, data)
    return response.data
  }

  async editPoint(data: EditPointData) {
    const response = await this.axios.put(`/locations/${data.id}`, data)
    return response.data
  }

  async deletePoint(id: number) {
    const response = await this.axios.put(`/locations/${id}`)
    return response.data
  }
}
