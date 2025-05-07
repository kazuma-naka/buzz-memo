'use server';

import { createClient } from '@/lib/supabase/server';

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
