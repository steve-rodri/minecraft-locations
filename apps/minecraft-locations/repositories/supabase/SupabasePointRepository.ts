import { supabase } from '../../lib/supabase';
import { CreatePointData, EditPointData, IPointRepository } from '../../interfaces/IPointRepository';

export class SupabasePointRepository implements IPointRepository {
  async getPoint(id = 1) {
    const { data: point } = await supabase
      .from("points")
      .select("id, x, y, z, label, server:servers(id, name)")
      .eq("id", id)
      .maybeSingle();
    return point;
  }

  async getPoints(serverId = 1) {
    const { data: points } = await supabase
      .from("points")
      .select("id, x, y, z, label")
      .eq("server_id", serverId)
      .order("created_at", { ascending: false });

    if (points && points.length > 1) {
      return points.map((p) => {
        const { id, x, y, z, label } = p;
        return { id, x, y, z, label };
      });
    }
    return [];
  }

  async createPoint(point: CreatePointData) {
    const { data } = await supabase
      .from("points")
      .insert([point])
      .select("id, x, y, z, label");
    if (data) return data[0];
  }

  async editPoint(point: EditPointData) {
    const { data } = await supabase
      .from("points")
      .update(point)
      .eq("id", point.id)
      .select("id, x, y, z, label")
      .maybeSingle();
    return data;
  }

  async deletePoint(id: number) {
    await supabase.from("points").delete().eq("id", id);
    return { success: true };
  }
}
