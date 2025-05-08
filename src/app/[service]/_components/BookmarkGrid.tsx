import { Bookmark } from '@/types/bookmark';
import {
  getVisibleBookmarks,
  sortBookmarksByDate,
  groupBookmarksByYearMonth,
} from '@/lib/bookmark';
import { fetchTagList } from '@/actions/tagList';
import { YearMonthCard } from './YearMonthCard';
import { BookmarkCard } from './BookmarkCard';

interface Props {
  bookmarks: Bookmark[];
  editable?: boolean;
  servicePath?: string;
}

const BookmarkGrid: React.FC<Props> = async ({
  bookmarks,
  editable = false,
  servicePath,
}) => {
  const visibleBookmarks = getVisibleBookmarks(bookmarks, editable);
  const sortedBookmarks = sortBookmarksByDate(visibleBookmarks);
  const groupedBookmarks = groupBookmarksByYearMonth(sortedBookmarks);

  const tagEntries = await Promise.all(
    sortedBookmarks.map(async (bookmark) => {
      const { tagListId, tags } = await fetchTagList(bookmark.id);
      return [bookmark.id, { tagListId, tags }] as [
        string,
        { tagListId: string; tags: string[] },
      ];
    }),
  );
  const tagMap: Record<string, { tagListId: string; tags: string[] }> =
    Object.fromEntries(tagEntries);

  if (sortedBookmarks.length === 0)
    return (
      <p className="mt-8 text-center text-gray-500">ブックマークはありません</p>
    );

  return (
    <div className="relative">
      <div className="mx-auto mt-10 max-w-screen-xl space-y-12 px-4">
        {Object.entries(groupedBookmarks).map(([yearMonth, bookmarks]) => (
          <section key={yearMonth}>
            <div data-ym={yearMonth} className="flex justify-center">
              <YearMonthCard label={yearMonth} />
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((bookmark) => {
                const info = tagMap[bookmark.id] || { tagListId: '', tags: [] };
                return (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    editable={editable}
                    servicePath={servicePath}
                    initialTags={info.tags}
                    initialTagListId={info.tagListId}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BookmarkGrid;
