import {
  IServerRepository,
  ServersResponse,
} from "../interfaces/IServerRepository"
import axios, { AxiosInstance } from "axios"

export class ServerRepository implements IServerRepository {
  private axios: AxiosInstance = axios.create()

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }

  async getServers() {
    const response = await this.axios.get<ServersResponse | null>(`/servers`)
    return response.data
  }
}
