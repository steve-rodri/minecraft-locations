import { useQuery } from "@tanstack/react-query"
import { serverRepo } from "../repositories"

export const useGetServers = () => {
  return useQuery({
    queryKey: ["servers"],
    queryFn: async () => serverRepo.getServers(),
  })
}
