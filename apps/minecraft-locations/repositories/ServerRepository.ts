import { IServerRepository } from "../interfaces/IServerRepository"

export class SupabaseServerRepository implements IServerRepository {
  async getServers() {
    return []
  }
}
