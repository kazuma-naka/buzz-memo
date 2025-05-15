'use server';

import { createClient } from '@/lib/supabase/server';
import { Bookmark } from '@/types/bookmark';
import { BookmarkPayload } from '@/types/bookmarkPayload';
import type { User } from '@supabase/auth-js';
import { redirect } from 'next/navigation';

export async function fetchBookmarksByService(
  serviceId: string,
): Promise<Bookmark[]> {
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

export async function updateBookmarkByFormData(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const service = formData.get('service') as string;

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const favicon_url = formData.get('favicon_url') as string;
  const twitter_image_url = formData.get('twitter_image_url') as string;
  const url = formData.get('url') as string;
  const uploaded_date = formData.get('uploaded_date') as string;
  const memo = formData.get('memo') as string;
  const is_visible = formData.get('is_visible') === 'true';

  const newTags = formData
    .getAll('tags')
    .map((t) => (t as string).trim())
    .filter(Boolean);

  const { data: listRow, error: listError } = await supabase
    .from('tag_list')
    .select('id')
    .eq('bookmark_id', id)
    .maybeSingle();
  if (listError) throw new Error(listError.message);

  const tagListId = listRow?.id;
  if (tagListId) {
    const { data: existingData, error: existingError } = await supabase
      .from('tags')
      .select('tag_text')
      .eq('tag_list_id', tagListId);
    if (existingError) throw new Error(existingError.message);

    const existingTags = existingData.map((r) => r.tag_text);

    const toAdd = newTags.filter((t) => !existingTags.includes(t));
    const toRemove = existingTags.filter((t) => !newTags.includes(t));

    if (toAdd.length > 0) {
      const { error: addErr } = await supabase
        .from('tags')
        .insert(
          toAdd.map((tag) => ({ tag_list_id: tagListId, tag_text: tag })),
        );
      if (addErr) throw new Error(addErr.message);
    }

    if (toRemove.length > 0) {
      const { error: delErr } = await supabase
        .from('tags')
        .delete()
        .eq('tag_list_id', tagListId)
        .in('tag_text', toRemove);
      if (delErr) throw new Error(delErr.message);
    }
  }

  const { error } = await supabase
    .from('bookmarks')
    .update({
      title,
      description,
      favicon_url,
      twitter_image_url,
      url,
      uploaded_date,
      memo,
      is_visible,
    })
    .eq('id', id);

  if (error) throw new Error(error.message);
  redirect(`/${service}`);
}

export async function deleteBookmarkByFormData(formData: FormData) {
  const id = formData.get('id') as string;
  const service = formData.get('service') as string;
  const supabase = await createClient();
  const { error } = await supabase.from('bookmarks').delete().eq('id', id);
  if (error) throw new Error(error.message);
  redirect(`/${service}`);
}

export async function insertBookmark(payload: BookmarkPayload) {
  const { publish_date, ...rest } = payload;
  const row = {
    ...rest,
    uploaded_date: publish_date ?? new Date().toISOString(),
  };

  const supabase = await createClient();
  const { error } = await supabase.from('bookmarks').insert(row);
  if (error) {
    throw new Error(
      `[insertBookmark] Supabase insert failed: ${error.message}`,
    );
  }
  return row;
}

export async function isBookmarkSaved(params: {
  userId: string;
  title: string;
}): Promise<boolean> {
  const { userId, title } = params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('last_updated_user_id', userId)
    .eq('title', title)
    .maybeSingle();

  if (error) {
    throw new Error(
      `[isBookmarkSaved] Supabase query failed: ${error.message}`,
    );
  }
  return !!data;
}
