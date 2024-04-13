import { supabase } from "../utils/supabase"

export const getPoints = async (serverId = 1) => {
  const { data: points } = await supabase
    .from("points")
    .select("x, y, z, label")
    .eq("server_id", serverId)
    .order("created_at", { ascending: false })

  if (points && points.length > 1) {
    return points.map((p) => {
      const { x, y, z, label } = p
      return { x, y, z, label }
    })
  }
  return []
}

export type Point = Awaited<ReturnType<typeof getPoints>>[0]
