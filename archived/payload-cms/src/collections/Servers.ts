import { CollectionConfig } from "payload/types"

const Servers: CollectionConfig = {
  slug: "servers",
  admin: {
    useAsTitle: "name",
  },
  fields: [{ type: "text", name: "name", unique: true, required: true }],
}

export default Servers
