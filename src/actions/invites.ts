import { createClient } from '@/lib/supabase/server';
import { InviteWithList } from '@/types/inviteWithList';

export async function getInvites(): Promise<InviteWithList[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('invite').select(`
      id,
      token,
      status,
      expired_at,
      invited_user_id,
      invite_lists(service_id, created_user_id)
    `);
  if (error) throw error;
  return data;
}

export async function deleteInvite(inviteId: string) {
  const supabase = await createClient();
  await supabase.from('invite').delete().eq('id', inviteId);
}
