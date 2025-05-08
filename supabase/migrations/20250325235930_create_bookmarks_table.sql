CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    last_updated_user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    favicon_url TEXT,
    twitter_image_url TEXT,
    uploaded_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    memo TEXT,
    url TEXT NOT NULL,
    service_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT fk_last_updated_user_id FOREIGN KEY (last_updated_user_id) REFERENCES public.users(id),
    CONSTRAINT fk_service_id_ FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_url UNIQUE (last_updated_user_id, url)
);

ALTER TABLE public.bookmarks
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公開: 全ユーザーがブックマークを参照可能"
  ON public.bookmarks
  FOR SELECT
  USING (true);

CREATE POLICY "ユーザー自身が自分のブックマークを追加できる"
  ON public.bookmarks
  FOR INSERT
    WITH CHECK (auth.uid()::text = last_updated_user_id);

CREATE POLICY "ユーザー自身が自分のブックマークを更新できる"
  ON public.bookmarks
  FOR UPDATE
    USING (auth.uid()::text = last_updated_user_id)
    WITH CHECK (auth.uid()::text = last_updated_user_id);

CREATE POLICY "ユーザー自身が自分のブックマークを削除できる"
  ON public.bookmarks
  FOR DELETE
    USING (auth.uid()::text = last_updated_user_id);
