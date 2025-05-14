import { Bookmark } from '@/types/bookmark';
import { getVisibleBookmarks } from '@/lib/bookmark';
import { fetchTagList } from '@/actions/tagList';
import BookmarkGridClient from './BookmarkGridClient';

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
      const { tags, tagListId } = await fetchTagList(bm.id);
      return [bm.id, { tags, tagListId }] as const;
    }),
  );
  const bookmarkTagDataMap = Object.fromEntries(entries);
  const tags = Array.from(new Set(entries.flatMap(([, d]) => d.tags))).sort();

  return (
    <BookmarkGridClient
      bookmarks={visible}
      bookmarkTagDataMap={bookmarkTagDataMap}
      tags={tags}
      editable={editable}
      servicePath={servicePath}
    />
  );
};

export default BookmarkGrid;
