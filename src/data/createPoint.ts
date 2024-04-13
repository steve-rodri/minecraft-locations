import { supabase } from "../utils/supabase"
import { Point } from "./getPoints"

type PointWithServerId = Point & { server_id: number }

export const createPoint = async (point: PointWithServerId) => {
  const { data } = await supabase
    .from("points")
    .insert([point])
    .select("x, y, z, label")
  if (data) return data[0]
}
