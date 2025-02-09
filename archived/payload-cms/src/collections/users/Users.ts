import { CollectionConfig } from "payload/types"
import adminsAndUser from "./access/adminsAndUser"
import { admins } from "../../access/admins"
import { anyone } from "../../access/anyone"
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin"
import { loginAfterCreate } from "./hooks/loginAfterCreate"
import { protectRoles } from "./hooks/protectRoles"
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
  hooks: {
    afterChange: [loginAfterCreate],
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
      saveToJWT: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin, protectRoles],
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
