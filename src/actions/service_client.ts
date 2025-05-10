import { createClient } from '@/lib/supabase/client';

export async function deleteService(serviceId: string) {
  const supabase = createClient();
  await supabase.from('services').delete().eq('id', serviceId);
}
