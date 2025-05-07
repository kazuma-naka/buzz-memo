import { Bookmark } from '@/types/bookmark';
import {
  getVisibleBookmarks,
  sortBookmarksByDate,
  groupBookmarksByYearMonth,
} from '@/lib/bookmark';
import { YearMonthCard } from './YearMonthCard';
import { BookmarkCard } from './BookmarkCard';

interface Props {
  bookmarks: Bookmark[];
  editable?: boolean;
  servicePath?: string;
}

const BookmarkGrid: React.FC<Props> = ({
  bookmarks,
  editable = false,
  servicePath,
}) => {
  const visible = getVisibleBookmarks(bookmarks, editable);
  const sortedBookmarks = sortBookmarksByDate(visible);
  const groupedBookmarks = groupBookmarksByYearMonth(sortedBookmarks);

  if (sortedBookmarks.length === 0)
    return (
      <p className="mt-8 text-center text-gray-500">ブックマークはありません</p>
    );

  return (
    <div className="relative">
      <div className="mx-auto mt-10 max-w-screen-xl space-y-12 px-4">
        {Object.entries(groupedBookmarks).map(([yearMonth, bms]) => (
          <section key={yearMonth}>
            <div data-ym={yearMonth} className="flex justify-center">
              <YearMonthCard label={yearMonth} />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bms.map((bm) => (
                <BookmarkCard
                  key={bm.id}
                  bookmark={bm}
                  editable={editable}
                  servicePath={servicePath}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BookmarkGrid;
