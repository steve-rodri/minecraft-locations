import z from "zod"

export const serverSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
})

export type Server = z.infer<typeof serverSchema>

export interface IServerRepository {
  getServers(): Promise<Server[] | null>
}
