import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qxeluulysbotzhnzuvyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZWx1dWx5c2JvdHpobnp1dnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0OTA0NjcsImV4cCI6MjA0NTA2NjQ2N30.aEkzu8YAUH4WWZJnWQ5CUMfpoU34kaRx_4LtLYpqrr0';

export const supabase = createClient(supabaseUrl, supabaseKey);