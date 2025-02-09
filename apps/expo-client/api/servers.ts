import { trpc } from "./trpc"

export const useGetServers = () => {
  return trpc.servers.getServers.useQuery()
}
