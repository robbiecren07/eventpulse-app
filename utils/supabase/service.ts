import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key
export const createServiceClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use the service role key here
  );
};
