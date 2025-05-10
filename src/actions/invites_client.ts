import { createClient } from '@/lib/supabase/client';

export async function deleteInvite(inviteId: string) {
  const supabase = createClient();
  await supabase.from('invite').delete().eq('id', inviteId);
}

export async function getInviteListByServiceId(serviceId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('invite_lists')
    .select('id')
    .eq('service_id', serviceId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertInvite(
  listId: string,
  inviteToken: string,
  inviteEmail: string,
) {
  const supabase = createClient();
  const { error } = await supabase.from('invite').insert({
    invite_list_id: listId,
    invited_user_id: inviteEmail,
    token: inviteToken,
    status: 0,
    expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
  if (error) throw error;
}
