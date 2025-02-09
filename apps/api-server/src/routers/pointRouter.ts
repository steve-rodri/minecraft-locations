import { z } from "zod"
import { publicProcedure, trpcRouter } from "../trpc"
import {
  createPointSchema,
  editPointSchema,
} from "../interfaces/IPointRepository"

export const pointRouter = trpcRouter({
  getPoint: publicProcedure
    .meta({ description: "Gets a single Point" })
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.pointRepo.getPoint(input.id)
    }),
  getPoints: publicProcedure
    .meta({ description: "Gets a list of Points" })
    .input(z.object({ serverId: z.number().optional() }))
    .query(({ ctx, input }) => {
      return ctx.pointRepo.getPoints(input.serverId)
    }),
  createPoint: publicProcedure
    .meta({ description: "Creates a Point" })
    .input(createPointSchema)
    .mutation(({ ctx, input }) => {
      return ctx.pointRepo.createPoint(input)
    }),
  editPoint: publicProcedure
    .meta({ description: "Edit a Point" })
    .input(editPointSchema)
    .mutation(({ ctx, input }) => {
      return ctx.pointRepo.editPoint(input)
    }),
  deletePoint: publicProcedure
    .meta({ description: "Delete a Point" })
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.pointRepo.deletePoint(input.id)
    }),
})
