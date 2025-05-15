'use client';

import React, { useState } from 'react';
import { sortBookmarksByDate, groupBookmarksByYearMonth } from '@/lib/bookmark';
import { Bookmark } from '@/types/bookmark';
import { YearMonthCard } from '../YearMonthCard';
import { BookmarkCard } from '../BookmarkCard';
import EmptyBookmark from '../EmptyBookmark';

type Props = {
  bookmarks: Bookmark[];
  bookmarkTagDataMap: Record<string, { tags: string[]; tagListId: string }>;
  tags: string[];
  editable: boolean;
  servicePath?: string;
};

export default function BookmarkGridClient({
  bookmarks,
  bookmarkTagDataMap,
  tags,
  editable,
  servicePath,
}: Props) {
  const [selectedTag, setSelectedTag] = useState('ALL');

  const filtered =
    selectedTag === 'ALL'
      ? bookmarks
      : bookmarks.filter((b) =>
          bookmarkTagDataMap[b.id].tags.includes(selectedTag),
        );

  const sorted = sortBookmarksByDate(filtered);
  const grouped = groupBookmarksByYearMonth(sorted);

  if (!sorted.length) return <EmptyBookmark />;

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      {editable && (
        <div className="mt-6 mb-4 flex justify-center">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="p-2 border rounded-md bg-white shadow-sm"
          >
            <option value="ALL">全て</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-12 mt-10">
        {Object.entries(grouped).map(([ym, bms]) => (
          <section key={ym}>
            <div className="flex justify-center mb-4">
              <YearMonthCard label={ym} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bms.map((bk) => (
                <BookmarkCard
                  key={bk.id}
                  bookmark={bk}
                  editable={editable}
                  servicePath={servicePath}
                  initialTags={bookmarkTagDataMap[bk.id].tags}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
