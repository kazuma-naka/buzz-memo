'use server';

import { createClient } from '@/lib/supabase/server';
import type { User } from '@supabase/auth-js';

export async function fetchBookmarksByService(serviceId: string): Promise<
  {
    id: string;
    title: string;
    last_updated_user_id: string;
    description: string | null;
    favicon_url: string | null;
    twitter_image_url: string | null;
    uploaded_date: string;
    is_visible: boolean;
    memo: string | null;
    url: string;
  }[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select(
      `
      id,
      title,
      last_updated_user_id,
      description,
      favicon_url,
      twitter_image_url,
      uploaded_date,
      is_visible,
      memo,
      url
    `,
    )
    .eq('service_id', serviceId);

  if (error) {
    console.error('fetchBookmarksByService error:', error);
    throw new Error(error.message);
  }

  return data;
}

export async function fetchBookmarkByBookmarkId(id: string) {
  const supabase = await createClient();
  const { data: bookmark, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return bookmark;
}

export async function saveBookmarkMemo(bookmarkId: string, memoText: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ memo: memoText })
    .eq('id', bookmarkId);

  if (error) {
    throw new Error(error.message);
  }
}

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

export async function toggleBookmarkVisibility(
  bookmarkId: string,
  isVisible: boolean,
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ is_visible: isVisible })
    .eq('id', bookmarkId);

  if (error) {
    throw new Error(`Failed to update visibility: ${error.message}`);
  }
}
