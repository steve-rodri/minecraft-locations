import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";

export const getPoints = async (serverId = 1) => {
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
};

export const useGetPoints = (serverId = 1) => {
  return useQuery({
    queryKey: ["points", serverId],
    queryFn: async () => getPoints(serverId),
  });
};

export const useGetPoint = (id: number) => {
  return useQuery({
    queryKey: ["points", id],
    queryFn: async () => {
      const { data: point } = await supabase
        .from("points")
        .select("id, x, y, z, label, server:servers(id, name)")
        .eq("id", id)
        .maybeSingle();
      return point;
    },
  });
};

export type Point = Awaited<ReturnType<typeof getPoints>>[0];

export const useCreatePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-point"],
    mutationFn: async (point: Omit<Point, "id"> & { server_id: number }) => {
      const { data } = await supabase
        .from("points")
        .insert([point])
        .select("id, x, y, z, label");
      if (data) return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};

export const useEditPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-point"],
    mutationFn: async (point: Point & { server_id?: number }) => {
      const { data } = await supabase
        .from("points")
        .update(point)
        .select("id, x, y, z, label")
        .maybeSingle();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};

export const useDeletePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-point"],
    mutationFn: async (id: number) => {
      await supabase.from("points").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};
