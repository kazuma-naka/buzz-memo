'use client';

import { Bookmark } from '@/types/bookmark';
import { sortBookmarksByDate, groupBookmarksByYearMonth } from '@/lib/bookmark';
import { YearMonthCard } from './YearMonthCard';
import { BookmarkCard } from './BookmarkCard';
import EmptyBookmark from './EmptyBookmark';

interface Props {
  bookmarks: Bookmark[];
  editable: boolean;
  servicePath?: string;
}

export default function BookmarkGridInner({
  bookmarks,
  editable,
  servicePath,
}: Props) {
  const sorted = sortBookmarksByDate(bookmarks);
  const grouped = groupBookmarksByYearMonth(sorted);

  if (sorted.length === 0) return <EmptyBookmark />;

  return (
    <div className="relative">
      <div className="mx-auto mt-10 max-w-screen-xl space-y-12 px-4">
        {Object.entries(grouped).map(([yearMonth, bms]) => (
          <section key={yearMonth}>
            <div data-ym={yearMonth} className="flex justify-center">
              <YearMonthCard label={yearMonth} />
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bms.map((bk) => (
                <BookmarkCard
                  key={bk.id}
                  bookmark={bk}
                  editable={editable}
                  servicePath={servicePath}
                  initialTags={[]}
                  initialTagListId=""
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
