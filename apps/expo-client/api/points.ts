import { Server } from "../interfaces/IServerRepository"
import { trpc } from "./trpc"
import type { PointWithServer } from "../../api-server/src/interfaces/IPointRepository"

export const useGetPoints = (serverId = 1) => {
  return trpc.points.getPoints.useQuery({ serverId })
}

export const useGetPoint = (id: number, server: Server | null) => {
  const utils = trpc.useUtils()
  return trpc.points.getPoint.useQuery(
    { id },
    {
      initialData: () => {
        const points: PointWithServer[] =
          utils.points.getPoints.getData({ serverId: server.id }) ?? []
        const point = points.find((p) => p.id === id)
        if (!point) return null
        return point
      },
    },
  )
}

export const useCreatePoint = () => {
  const utils = trpc.useUtils()
  return trpc.points.createPoint.useMutation({
    onSuccess: () => utils.points.getPoints.invalidate(),
  })
}

export const useEditPoint = () => {
  const utils = trpc.useUtils()
  return trpc.points.editPoint.useMutation({
    onSuccess: () => utils.points.getPoints.invalidate(),
  })
}

export const useDeletePoint = () => {
  const utils = trpc.useUtils()
  return trpc.points.deletePoint.useMutation({
    onSuccess: () => utils.points.getPoints.invalidate(),
  })
}
