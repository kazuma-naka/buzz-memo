import { fetchBookmarksByService } from '@/actions/fetchBookmarks';
import fetchServicesByPath from '@/actions/fetchServicesByPath';
import { isBookmarkEditable } from '@/actions/isBookmarkEditable';
import { createClient } from '@/lib/supabase/server';
import BookmarkGrid from './_components/BookmarkGrid';

type Props = {
  params: Promise<{ service: string }>;
};

export default async function ServicePage({ params }: Props) {
  const { service: servicePath } = await params;
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  const service = await fetchServicesByPath(servicePath);
  if (!service) return <div>サービスが見つかりませんでした。</div>;
  if (!user) {
    return <div>ログインしてください。</div>;
  }
  const serviceId = service.id;
  const idEditable = await isBookmarkEditable(user, serviceId);
  const bookmarks = await fetchBookmarksByService(serviceId);

  return (
    <div>
      <BookmarkGrid
        bookmarks={bookmarks}
        editable={idEditable}
        servicePath={servicePath}
      />
    </div>
  );
}
