import { fetchBookmarksByService } from '@/actions/fetchBookmarks';
import fetchServicesByPath from '@/actions/fetchServicesByPath';
import { createClient } from '@/lib/supabase/server';

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
  const serviceId = service.id;
  const bookmarks = await fetchBookmarksByService(serviceId);
}
