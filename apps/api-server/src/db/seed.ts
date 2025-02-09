import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { pointsTable, serversTable } from "./schema"
import { DATABASE_URL } from "../env"
import { faker } from "@faker-js/faker"

const db = drizzle(DATABASE_URL!)

const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)]
}

const createServer: () => typeof serversTable.$inferInsert = () => ({
  name: faker.word.noun(),
})

const createPoint: (serverId: number) => typeof pointsTable.$inferInsert = (
  serverId,
) => ({
  label: faker.word.noun(),
  x: faker.number.int({ min: 0, max: 200 }),
  y: faker.number.int({ min: 0, max: 200 }),
  z: faker.number.int({ min: 0, max: 200 }),
  serverId,
})

async function main() {
  await db.insert(serversTable).values(Array.from({ length: 3 }, createServer))
  const servers = await db.select().from(serversTable)
  console.log("New servers created!")

  await db.insert(pointsTable).values(
    Array.from({ length: 10 }, () => {
      const server = getRandomItem(servers)
      return createPoint(server.id)
    }),
  )
  console.log("New points created!")
}

main()
