import { CollectionConfig } from "payload/types"

const Points: CollectionConfig = {
  slug: "points",
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      type: "relationship",
      name: "server",
      relationTo: "servers",
      required: true,
    },
    { type: "text", name: "label", unique: true, required: true },
    { type: "number", name: "x", defaultValue: 0, required: true },
    { type: "number", name: "y", defaultValue: 0, required: true },
    { type: "number", name: "z", defaultValue: 0, required: true },
  ],
}

export default Points
