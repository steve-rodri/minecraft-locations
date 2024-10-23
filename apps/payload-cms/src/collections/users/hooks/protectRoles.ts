import type { FieldHook } from "payload/types"

import type { User } from "../../../payload-types"

export const protectRoles: FieldHook<User & { id: string }> = async ({
  req,
  data,
}) => {
  const isAdmin = req.user?.roles.includes("admin")

  if (!isAdmin) return []

  return new Set(data?.roles || [])
}
