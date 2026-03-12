import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tynegdbfvuermlnyignc.supabase.co';
const supabaseAnonKey = 'sb_publishable_g_FdZEevOaDNtk1Jw8YRxA_YS2jl1HA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
