import fs from "fs"
import path from "path"

// Helper function to load JSON files
const loadJson = (filePath: string) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), "utf-8"))
}

const swaggerBase = loadJson("docs/swagger/base.json")
const authPaths = loadJson("docs/swagger/auth.json")
const trpcPaths = loadJson("docs/swagger/trpc.json")

// Merge everything
const swaggerOptions = {
  ...swaggerBase,
  paths: { ...authPaths, ...trpcPaths },
}

export default swaggerOptions
