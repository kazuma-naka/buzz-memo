import { Bookmark } from '@/types/bookmark';
import {
  getVisibleBookmarks,
  sortBookmarksByDate,
  groupBookmarksByYearMonth,
} from '@/lib/bookmark';
import { YearMonthCard } from './YearMonthCard';

interface Props {
  bookmarks: Bookmark[];
  editable?: boolean;
}

const BookmarkGrid: React.FC<Props> = ({ bookmarks, editable = false }) => {
  const visible = getVisibleBookmarks(bookmarks, editable);
  const sortedBookmarks = sortBookmarksByDate(visible);
  const groupsBookmarks = groupBookmarksByYearMonth(sortedBookmarks);

  if (sortedBookmarks.length === 0)
    return (
      <p className="mt-8 text-center text-gray-500">ブックマークはありません</p>
    );

  return (
    <div className="relative">
      <div className="mx-auto mt-10 max-w-screen-xl space-y-12 px-4">
        {Object.entries(groupsBookmarks).map(([yearMonth, bookmarks], i) => (
          <section key={yearMonth}>
            <div data-ym={yearMonth} className="flex justify-center">
              <YearMonthCard label={yearMonth} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BookmarkGrid;
