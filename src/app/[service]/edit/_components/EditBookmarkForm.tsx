export default function EditBookmarkForm({ initialData, service }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Bookmark>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger the delete form submit after confirmation
  const handleDeleteClick = () => {
    if (!window.confirm('本当にブックマークを削除しますか？')) return;
    setLoading(true);
    document.getElementById('delete-form')?.requestSubmit();
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* UPDATE FORM */}
      <form
        action={updateBookmarkByFormData}
        onSubmit={() => setLoading(true)}
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

        <div className="grid grid-cols-2 gap-4">
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
          <label className="block mb-1">Uploaded Date</label>
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
          <label className="block mb-1">Memo</label>
          <textarea
            name="memo"
            value={form.memo ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_visible"
              checked={form.is_visible}
              onChange={(e) =>
                setForm((f) => ({ ...f, is_visible: e.target.checked }))
              }
              className="mr-2"
            />
            公開する
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? '更新中…' : '更新する'}
        </button>
      </form>

      {/* DELETE FORM */}
      <form id="delete-form" action={deleteBookmarkByFormData} className="mt-4">
        <input type="hidden" name="id" value={form.id} />
        <input type="hidden" name="service" value={service} />

        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          {loading ? '削除中…' : 'ブックマークを削除する'}
        </button>
      </form>
    </div>
  );
}
