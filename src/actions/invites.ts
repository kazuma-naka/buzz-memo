'use server';

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
  console.log(`data: ${data}`);
  return data;
}

export async function updateInvite(
  userId: string,
  token: string,
  invitedUserEmail: string,
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('invite')
    .update({
      invited_user_id: userId,
      invited_user_email: invitedUserEmail,
      status: 1,
    })
    .eq('token', token)
    .select();
  if (error) {
    console.log(error);
    throw error;
  }
  return true;
}
