import { supabase } from "../../lib/supabase"
import { IServerRepository } from "../../interfaces/IServerRepository"

export class SupabaseServerRepository implements IServerRepository {
  async getServers() {
    const { data: servers } = await supabase.from("servers").select("id, name")
    return servers ?? []
  }
}
