'use client';

import { useState, useMemo } from 'react';
import { Bookmark } from '@/types/bookmark';
import { sortBookmarksByDate, groupBookmarksByYearMonth } from '@/lib/bookmark';
import { YearMonthCard } from './YearMonthCard';
import { BookmarkCard } from './BookmarkCard';
import EmptyBookmark from './EmptyBookmark';

interface TagInfo {
  tagListId: string;
  tags: string[];
}

interface Props {
  bookmarks: Bookmark[];
  tagMap: Record<string, TagInfo>;
  editable: boolean;
  servicePath?: string;
}

export default function BookmarkGridClient({
  bookmarks,
  tagMap,
  editable,
  servicePath,
}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    bookmarks.forEach((b) =>
      (tagMap[b.id]?.tags || []).forEach((t) => s.add(t)),
    );
    return Array.from(s).sort();
  }, [bookmarks, tagMap]);

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return bookmarks;
    return bookmarks.filter((b) =>
      selectedTags.some((t) => tagMap[b.id]?.tags.includes(t)),
    );
  }, [bookmarks, tagMap, selectedTags]);

  const sorted = sortBookmarksByDate(filtered);
  const grouped = groupBookmarksByYearMonth(sorted);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );

  if (sorted.length === 0) return <EmptyBookmark />;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`px-3 py-1 rounded-full border transition ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {Object.entries(grouped).map(([ym, bms]) => (
          <section key={ym}>
            <div data-ym={ym} className="flex justify-center">
              <YearMonthCard label={ym} />
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bms.map((bk) => {
                const info = tagMap[bk.id] ?? { tagListId: '', tags: [] };
                return (
                  <BookmarkCard
                    key={bk.id}
                    bookmark={bk}
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
}
