'use server';

import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/auth-js';

export async function isBookmarkEditable(
  user: User | null,
  serviceId: string,
): Promise<boolean> {
  const supabase = await createClient();

  const userId = user?.id;
  if (!userId) return false;

  const { data: inviteListRow } = await supabase
    .from('invite_lists')
    .select('created_user_id')
    .eq('service_id', serviceId)
    .maybeSingle();

  const { data: inviteRow } = await supabase
    .from('invite')
    .select('invited_user_id')
    .eq('invited_user_id', userId)
    .maybeSingle();

  return (
    userId === inviteListRow?.created_user_id ||
    userId === inviteRow?.invited_user_id
  );
}
