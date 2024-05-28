import { Database } from "./supabase";

export type ApiKeys = Database["public"]["Tables"]["sources"]["Row"]