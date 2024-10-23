import { CollectionConfig } from "payload/types"
import { admins } from "../../access/admins"
import { anyone } from "../../access/anyone"
import adminsAndUser from "./access/adminsAndUser"
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin"
import { checkRole } from "./util/checkRole"

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(["admin"], user),
  },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "admin",
          value: "admin",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: admins,
        create: admins,
        update: admins,
      },
    },
  ],
}

export default Users
