import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xagvfzupvmoczvnaoldv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZ3ZmenVwdm1vY3p2bmFvbGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMDMxMzgsImV4cCI6MjA2MDg3OTEzOH0.FXh-IzA11fQ5bouDuvhg7pSkGwv4MqQ6DCjZVXn-dZ8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 