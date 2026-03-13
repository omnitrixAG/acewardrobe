import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = "https://skosocpnkmmpfbbbwkmm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrb3NvY3Bua21tcGZiYmJ3a21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NDA5MzgsImV4cCI6MjA4OTAxNjkzOH0.U0UqogfzUfW9v8ynHFqCfiUcxsUPCxpIpFgahP5up5s";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
