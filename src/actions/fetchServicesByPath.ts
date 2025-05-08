'use server';

import { createClient } from '@/lib/supabase/server';

export default async function fetchServicesByPath(servicePath: string) {
  const supabase = await createClient();
  const normalizedPath = servicePath.replace(/_/g, ' ');
  const { data, error } = await supabase
    .from('services')
    .select('id,title,path')
    .eq('path', normalizedPath)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
