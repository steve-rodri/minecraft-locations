import { supabase } from "../utils/supabase"

export const getServers = async () => {
  const { data: servers } = await supabase.from("servers").select("id, name")

  return servers ?? []
}

export type Server = Awaited<ReturnType<typeof getServers>>[0]
