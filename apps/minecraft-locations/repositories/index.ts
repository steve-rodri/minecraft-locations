import { SupabasePointRepository } from "./supabase/SupabasePointRepository"
import { SupabaseServerRepository } from "./supabase/SupabaseServerRepository"

export const pointRepo = new SupabasePointRepository()
export const serverRepo = new SupabaseServerRepository()
