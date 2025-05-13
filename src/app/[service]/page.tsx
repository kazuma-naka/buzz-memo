import { fetchBookmarksByService } from '@/actions/bookmarks';
import { fetchServicesByPath } from '@/actions/services';
import { isBookmarkEditable } from '@/actions/bookmarks';
import { createClient } from '@/lib/supabase/server';
import BookmarkGrid from './_components/BookmarkGrid';
import Header from '@/components/Header';

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
  const serviceId = service.id;
  const idEditable = await isBookmarkEditable(user, serviceId);
  const bookmarks = await fetchBookmarksByService(serviceId);
  console.log(`idEditable: ${idEditable}`);
  return (
    <div>
      <Header title={service.title} />
      <BookmarkGrid
        bookmarks={bookmarks}
        editable={idEditable}
        servicePath={servicePath}
      />
    </div>
  );
}
