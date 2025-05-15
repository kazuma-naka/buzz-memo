'use client';

import { Bookmark } from '@/types/bookmark';
import { useState } from 'react';
import {
  updateBookmarkByFormData,
  deleteBookmarkByFormData,
} from '@/actions/bookmarks';
import { Eye, EyeOff } from 'lucide-react';
import { TagListResult } from '@/types/TagListResult';

type Props = {
  initialData: Bookmark;
  initialTags: TagListResult;
  service: string;
};

export default function EditBookmarkForm({
  initialData,
  initialTags,
  service,
}: Props) {
  const [form, setForm] = useState<Bookmark>(initialData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tags, setTags] = useState<string[]>(initialTags.tags ?? []);
  const [newTag, setNewTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTag = () => {
    const t = newTag.trim();
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 mb-6">
      <form
        id="updateForm"
        action={updateBookmarkByFormData}
        onSubmit={() => setIsUpdating(true)}
        className="space-y-4"
      >
        <input type="hidden" name="id" value={form.id} />
        <input type="hidden" name="service" value={service} />

        <div>
          <label className="block mb-1">タイトル</label>
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">説明</label>
          <textarea
            name="description"
            value={form.description ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Favicon URL</label>
          <input
            name="favicon_url"
            value={form.favicon_url ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, favicon_url: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Twitter Image URL</label>
          <input
            name="twitter_image_url"
            value={form.twitter_image_url ?? ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, twitter_image_url: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">URL</label>
          <input
            name="url"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">公開日</label>
          <input
            type="datetime-local"
            name="uploaded_date"
            value={new Date(form.uploaded_date).toISOString().slice(0, 16)}
            onChange={(e) =>
              setForm((f) => ({ ...f, uploaded_date: e.target.value }))
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">メモ</label>
          <textarea
            name="memo"
            value={form.memo ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="block">
          <span className="font-semibold">公開ステータス</span>
          <label className="flex items-center space-x-2 cursor-pointer text-gray-500 mt-3">
            <input
              type="checkbox"
              name="is_visible"
              value="true"
              checked={form.is_visible}
              onChange={handleChange}
              className="sr-only peer"
            />
            <EyeOff
              size={20}
              className="peer-checked:hidden transition-transform duration-200 text-[#FF6B6B]"
            />
            <Eye
              size={20}
              className="hidden peer-checked:block transition-transform duration-200"
            />
            <span
              className={`select-none ${!form.is_visible ? 'text-[#FF6B6B]' : ''}`}
            >
              {form.is_visible ? '公開する' : '非公開'}
            </span>
          </label>
        </div>

        <div>
          <label className="block mb-1 font-semibold">タグ</label>
          <div className="mb-2 flex items-center space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="タグを追加"
              className="flex-1 p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center bg-gray-200 rounded-full"
                >
                  <span className="px-2 py-1">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="p-1 hover:bg-gray-300 rounded-full"
                    aria-label={`${tag} を削除`}
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">まだタグがありません</p>
            )}
          </div>
        </div>

        {tags.map((tag) => (
          <input key={tag} type="hidden" name="tags" value={tag} />
        ))}
      </form>

      <div className="flex justify-end gap-4">
        <button
          form="updateForm"
          type="submit"
          disabled={isUpdating || isDeleting}
          className="px-4 py-2 bg-[#5C8DEC] text-white rounded hover:opacity-90 transition"
        >
          {isUpdating ? '更新中…' : '更新する'}
        </button>

        <form
          id="deleteForm"
          action={deleteBookmarkByFormData}
          onSubmit={() => setIsDeleting(true)}
          className="inline-block"
        >
          <input type="hidden" name="id" value={form.id} />
          <input type="hidden" name="service" value={service} />
          <button
            type="submit"
            disabled={isUpdating || isDeleting}
            onClick={(e) => {
              if (!window.confirm('本当にブックマークを削除しますか？')) {
                e.preventDefault();
              }
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:opacity-90 transition"
          >
            {isDeleting ? '削除中…' : '削除する'}
          </button>
        </form>
      </div>
    </div>
  );
}
