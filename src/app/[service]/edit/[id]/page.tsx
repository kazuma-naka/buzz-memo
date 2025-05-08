import { fetchBookmarkByBookmarkId } from '@/actions/bookmarks';

type Params = { service: string; id: string };

export default async function EditBookmarkPage({ params }: { params: Params }) {
  let bookmark;
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
    <div className="mt-4 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-2">{bookmark.title}</h2>
      {bookmark.description && <p className="mb-4">{bookmark.description}</p>}
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Visit link
      </a>
    </div>
  );
}
