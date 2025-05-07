import { fetchBookmarksByService } from '@/actions/fetchBookmarks';
import fetchServicesByPath from '@/actions/fetchServicesByPath';
import { isBookmarkEditable } from '@/actions/isBookmarkEditable';
import { createClient } from '@/lib/supabase/server';
import BookmarkGrid from './_components/BookmarkGrid';

type Props = {
  params: { service: string };
};

export default async function ServicePage({ params }: Props) {
  const {
    data: { session },
  } = await (await createClient()).auth.getSession();
  const servicePath = params.service;
  const service = await fetchServicesByPath(servicePath);
  if (!service) return <div>サービスが見つかりませんでした。</div>;
  if (!session) {
    return <div>ログインしてください。</div>;
  }
  const serviceId = service.id;
  const idEditable = await isBookmarkEditable(session, serviceId);
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
