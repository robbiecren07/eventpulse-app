import { Database } from "./supabase";

export type ApiKeys = Database["public"]["Tables"]["api_keys"]["Row"]