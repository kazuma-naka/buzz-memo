import { Bookmark } from '@/types/bookmark';
import { getVisibleBookmarks } from '@/lib/bookmark';
import { fetchTagList } from '@/actions/tagList';
import BookmarksSection from './BookmarksSection';

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
  const visible = getVisibleBookmarks(bookmarks, editable);
  const entries = await Promise.all(
    visible.map(async (bm) => {
      const { tags } = await fetchTagList(bm.id);
      return [bm.id, tags] as const;
    }),
  );
  const bookmarkTagMap: Record<string, string[]> = Object.fromEntries(entries);

  const tags = Array.from(new Set(entries.flatMap(([, tags]) => tags))).sort();

  return (
    <BookmarksSection
      bookmarks={visible}
      tags={tags}
      bookmarkTagMap={bookmarkTagMap}
      editable={editable}
      servicePath={servicePath}
    />
  );
};

export default BookmarkGrid;
