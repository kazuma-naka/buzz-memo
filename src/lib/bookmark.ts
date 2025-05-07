import type { Bookmark } from '@/types/bookmark';

export function getVisibleBookmarks(
  bookmarks: Bookmark[],
  editable: boolean,
): Bookmark[] {
  return editable ? bookmarks : bookmarks.filter((b) => b.is_visible);
}

export function sortBookmarksByDate(bookmarks: Bookmark[]): Bookmark[] {
  return [...bookmarks].sort(
    (a, b) => +new Date(b.uploaded_date) - +new Date(a.uploaded_date),
  );
}

export function groupBookmarksByYearMonth(
  bookmarks: Bookmark[],
): Record<string, Bookmark[]> {
  return bookmarks.reduce<Record<string, Bookmark[]>>((acc, bm) => {
    const d = new Date(bm.uploaded_date);
    const ym = `${d.getFullYear()}年${d.getMonth() + 1}月`;
    (acc[ym] ||= []).push(bm);
    return acc;
  }, {});
}
