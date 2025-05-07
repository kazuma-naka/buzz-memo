import { createClient } from '@/lib/supabase/server';

export default async function fetchServices(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select('id,title,path')
    .eq('created_user_id', userId);
  if (error) throw new Error(error.message);
  return data;
}
