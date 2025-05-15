import { fetchBookmarkByBookmarkId } from '@/actions/bookmarks';
import EditBookmarkForm from '../_components/EditBookmarkForm';
import { Bookmark } from '@/types/bookmark';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchTagList } from '@/actions/tagList';

type Params = {
  params: Promise<{
    service: string;
    id: string;
  }>;
};

export default async function EditBookmarkPage({ params }: Params) {
  const { service, id } = await params;

  let bookmark: Bookmark;
  try {
    bookmark = await fetchBookmarkByBookmarkId(id);
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

  const tags = await fetchTagList(bookmark.id);

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-semibold mt-6 mb-4 text-center">
        {bookmark.title}
      </h1>
      <EditBookmarkForm
        initialData={bookmark}
        initialTags={tags}
        service={service}
      />
      <Footer />
    </div>
  );
}
