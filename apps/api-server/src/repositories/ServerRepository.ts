import { IServerRepository } from "../interfaces/IServerRepository"
import { db } from "../db"

export class ServerRepository implements IServerRepository {
  async getServers() {
    return db.query.serversTable.findMany()
  }
}
