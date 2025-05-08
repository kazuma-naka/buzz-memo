import { fetchBookmarkByBookmarkId } from '@/actions/bookmarks';
import EditBookmarkForm from '../_components/EditBookmarkForm';
import { Bookmark } from '@/types/bookmark';

type Params = { service: string; id: string };

export default async function EditBookmarkPage({ params }: { params: Params }) {
  let bookmark: Bookmark;
  try {
    bookmark = await fetchBookmarkByBookmarkId(params.id);
  } catch (err: any) {
    return (
      <p className="mt-4 text-red-500">ブックマークの読み込みに失敗しました</p>
    );
  }

  if (!bookmark) {
    return (
      <p className="mt-4 text-red-500">ブックマークが見つかりませんでした。</p>
    );
  }

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold mb-4">{bookmark.title}</h1>
      <EditBookmarkForm initialData={bookmark} service={params.service} />
    </div>
  );
}
