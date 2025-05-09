import { createClient } from '@/lib/supabase/client';

export async function deleteInvite(inviteId: string) {
  const supabase = createClient();
  await supabase.from('invite').delete().eq('id', inviteId);
}
