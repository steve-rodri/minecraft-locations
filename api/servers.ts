import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";

export const getServers = async () => {
  const { data: servers } = await supabase.from("servers").select("id, name");

  return servers ?? [];
};

export const useGetServers = () => {
  return useQuery({ queryKey: ["servers"], queryFn: async () => getServers() });
};

export type Server = Awaited<ReturnType<typeof getServers>>[0];
