import { fetchTagList } from '@/actions/tagList';

export default async function TagListDisplay({
  bookmarkId,
}: {
  bookmarkId: string;
}) {
  const { tagListId, tags } = await fetchTagList(bookmarkId);
  return (
    <div>
      <p>TagList ID: {tagListId}</p>
      <ul>
        {tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
