import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { axiosInstance, pointRepo } from "../repositories"
import { Server } from "../interfaces/IServerRepository"
import {
  CreatePointData,
  EditPointData,
  PointsResponse,
} from "../interfaces/IPointRepository"
import { PointRepository } from "../repositories/PointRepository"

export const useGetPoints = (serverId = 1) => {
  return useQuery({
    queryKey: ["points", serverId],
    queryFn: async () => pointRepo.getPoints(serverId),
  })
}

export const useGetPoint = (id: number, server: Server | null) => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ["points", id],
    queryFn: async () => pointRepo.getPoint(id),
    initialData: () => {
      const pointsResponse = queryClient.getQueryData<PointsResponse>([
        "points",
        server?.id,
      ])
      const point = pointsResponse?.docs.find((p) => p.id === id)
      if (!point) return null
      return point
    },
  })
}

export const useCreatePoint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-point"],
    mutationFn: async (data: CreatePointData) => {
      const pointRepo = new PointRepository(axiosInstance)
      return pointRepo.createPoint(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] })
    },
  })
}

export const useEditPoint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["edit-point"],
    mutationFn: async (data: EditPointData) => {
      const pointRepo = new PointRepository(axiosInstance)
      return pointRepo.editPoint(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] })
    },
  })
}

export const useDeletePoint = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["delete-point"],
    mutationFn: async (id: number) => {
      const pointRepo = new PointRepository(axiosInstance)
      return pointRepo.deletePoint(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] })
    },
  })
}
