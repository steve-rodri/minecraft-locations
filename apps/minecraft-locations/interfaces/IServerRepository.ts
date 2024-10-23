import { PayloadDocResponse } from "../lib/payload.types"

export type Server = {
  id: number
  name: string
  updatedAt: string
  createdAt: string
}

export type ServersResponse = PayloadDocResponse<Server>

export interface IServerRepository {
  getServers(): Promise<ServersResponse | null>
}
