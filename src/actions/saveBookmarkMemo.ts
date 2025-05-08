'use server';

import { createClient } from '@/lib/supabase/server';

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
