'use client';

import React, { useState } from 'react';
import BookmarkGridInner from './BookmarkGridInner';
import { Bookmark } from '@/types/bookmark';

type Props = {
  bookmarks: Bookmark[];
  tags: string[];
  bookmarkTagMap: Record<string, string[]>;
  editable: boolean;
  servicePath?: string;
};

const BookmarksSection: React.FC<Props> = ({
  bookmarks,
  tags,
  bookmarkTagMap,
  editable,
  servicePath,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const filtered =
    selectedTag === 'ALL'
      ? bookmarks
      : bookmarks.filter((b) => bookmarkTagMap[b.id]?.includes(selectedTag));

  return (
    <div className="mx-auto max-w-screen-xl px-4">
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

      <BookmarkGridInner
        bookmarks={filtered}
        editable={editable}
        servicePath={servicePath}
      />
    </div>
  );
};

export default BookmarksSection;
