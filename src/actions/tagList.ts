'use server';

import { createClient } from '@/lib/supabase/server';
import { TagListResult } from '@/types/TagListResult';

export async function fetchTagList(bookmarkId: string): Promise<TagListResult> {
  const supabase = await createClient();

  const { data: listRow, error: listError } = await supabase
    .from('tag_list')
    .select('id')
    .eq('bookmark_id', bookmarkId)
    .maybeSingle();
  if (listError) throw new Error(listError.message);

  const tagListId =
    listRow?.id ??
    (
      await supabase
        .from('tag_list')
        .insert({ bookmark_id: bookmarkId })
        .select('id')
        .single()
    ).data!.id;

  const { data: tagsData, error: tagsError } = await supabase
    .from('tags')
    .select('tag_text')
    .eq('tag_list_id', tagListId);
  if (tagsError) throw new Error(tagsError.message);

  return {
    tagListId,
    tags: tagsData.map((t) => t.tag_text),
  };
}

export async function addTag(tagListId: string, tagText: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tags')
    .insert({ tag_list_id: tagListId, tag_text: tagText });
  if (error) throw new Error(error.message);
}

export async function removeTag(tagListId: string, tagText: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('tag_list_id', tagListId)
    .eq('tag_text', tagText);
  if (error) throw new Error(error.message);
}
