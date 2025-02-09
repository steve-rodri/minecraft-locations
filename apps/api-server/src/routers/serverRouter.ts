import { publicProcedure, trpcRouter } from "../trpc"

export const serverRouter = trpcRouter({
  getServers: publicProcedure
    .meta({ description: "Gets a list of Servers" })
    .query(({ ctx }) => {
      return ctx.serverRepo.getServers()
    }),
  // getServer: publicProcedure
  //   .meta({ description: "Gets a single Server" })
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.serverRepo.getServer(input.id)
  //   }),
  // createServer: publicProcedure
  //   .meta({ description: "Creates a Server" })
  //   .input(createServerSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.serverRepo.createServer(input)
  //   }),
  // editServer: publicProcedure
  //   .meta({ description: "Edit a Server" })
  //   .input(editServerSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.serverRepo.editServer(input)
  //   }),
  // deleteServer: publicProcedure
  //   .meta({ description: "Delete a Server" })
  //   .input(z.object({ id: z.number() }))
  //   .mutation(({ ctx, input }) => {
  //     return ctx.serverRepo.deleteServer(input.id)
  //   }),
})
