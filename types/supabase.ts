export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          api_key: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          api_key: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          api_key?: string;
          created_at?: string | null;
        };
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          event_name: string;
          event_data: Json;
          raw_data: Json;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_name: string;
          event_data: Json;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_name?: string;
          event_data?: Json;
          created_at?: string | null;
        };
      };
      users: {
        Row: {
          id: string;
          updated_at: string | null;
          full_name: string | null;
          avatar_url: string | null;
          email: string;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email: string;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
