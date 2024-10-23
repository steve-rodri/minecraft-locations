import type { Access } from "payload/types"

import { checkRole } from "../util/checkRole"

const adminsAndUser: Access = ({ req: { user } }) => {
  if (!user) return false

  if (checkRole(["admin"], user)) {
    return true
  }

  return {
    id: user.id,
  }
}

export default adminsAndUser
