import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hepkwshwkreloegvwqrw.supabase.co';
const supabaseAnonKey = 'sb_publishable_v8Nu4Y8YZlCrzlyYB5aKNQ_W-89j9pt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);