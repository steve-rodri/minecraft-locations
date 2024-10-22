import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pointRepo } from "~/repositories";
import { Server } from "~/interfaces/IServerRepository";
import { Point } from "~/interfaces/IPointRepository";

export const useGetPoints = (serverId = 1) => {
  return useQuery({
    queryKey: ["points", serverId],
    queryFn: async () => pointRepo.getPoints(serverId),
  });
};

export const useGetPoint = (id: number, server: Server | null) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["points", id],
    queryFn: async () => pointRepo.getPoint(id),
    initialData: () => {
      const points = queryClient.getQueryData<Point[]>(["points", server?.id]);
      const point = points?.find((p) => p.id === id) ?? {
        id: 0,
        x: 0,
        y: 0,
        z: 0,
        label: "",
      };
      return { ...point, server };
    },
  });
};

export const useCreatePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-point"],
    mutationFn: pointRepo.createPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};

export const useEditPoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-point"],
    mutationFn: pointRepo.editPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};

export const useDeletePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-point"],
    mutationFn: pointRepo.deletePoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
    },
  });
};
