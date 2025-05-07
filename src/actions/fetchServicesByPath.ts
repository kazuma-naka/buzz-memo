'use server';

import { createClient } from '@/lib/supabase/server';

export default async function fetchServicesByPath(servicePath: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('id,title,path')
    .eq('path', servicePath)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
