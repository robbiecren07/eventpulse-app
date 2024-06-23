export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      api_keys: {
        Row: {
          id: string
          user_id: string
          api_key: string
          type: string
          connection_type: string
          category: string
          destination: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          api_key: string
          type: string
          connection_type: string
          category: string
          destination: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          api_key?: string
          type: string
          connection_type: string
          category: string
          destination: string | null
          created_at?: string | null
        }
      }
      sources: {
        Row: {
          id: string
          user_id: string
          source_name: string
          source_slug: string
          api_key: string
          type: string
          connection_type: string
          category: string
          destination: Json
          website_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          source_name: string
          source_slug?: string
          api_key: string
          type: string
          connection_type: string
          category: string
          destination: Json
          website_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          source_name?: string
          source_slug?: string
          api_key?: string
          type?: string
          connection_type?: string
          category?: string
          destination?: Json
          website_url?: string | null
          created_at?: string | null
        }
      }
      events: {
        Row: {
          id: string
          user_id: string
          event_name: string
          event_data: Json
          raw_data: Json
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          event_name: string
          event_data: Json
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          event_name?: string
          event_data?: Json
          created_at?: string | null
        }
      }
      javascript_events: {
        Row: {
          id: string
          source_id: string
          user_id: string
          event_name: string
          event_data: Json
          raw_data: Json
          created_at: string | null
        }
        Insert: {
          id?: string
          source_id: string
          user_id: string
          event_name: string
          event_data: Json
          created_at?: string | null
        }
        Update: {
          id?: string
          source_id?: string
          user_id?: string
          event_name?: string
          event_data?: Json
          created_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          email: string
          user_slug: string
          subscription_level: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email: string
          user_slug?: string
          subscription_level?: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string
          user_slug?: string
          subscription_level?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
