'use server';

import { createClient } from '@/lib/supabase/server';

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
