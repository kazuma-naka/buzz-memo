CREATE TABLE IF NOT EXISTS public.tags (
    id uuid primary key default gen_random_uuid(),
    tag_list_id uuid not null,
    tag_text text not null,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    constraint fk_tag_list_id foreign key (tag_list_id) references public.tag_list(id) on delete cascade
);

ALTER TABLE public.tags
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "サービス作成者がタグを参照できる"
  ON public.tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.tag_list tl
      JOIN public.bookmarks b
        ON tl.bookmark_id = b.id
      JOIN public.services s
        ON b.service_id = s.id
      WHERE tl.id = public.tags.tag_list_id
        AND auth.uid()::text = s.created_user_id
    )
  );

CREATE POLICY "サービス作成者がタグを追加できる"
  ON public.tags
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.tag_list tl
      JOIN public.bookmarks b
        ON tl.bookmark_id = b.id
      JOIN public.services s
        ON b.service_id = s.id
      WHERE tl.id = tag_list_id
        AND auth.uid()::text = s.created_user_id
    )
  );

CREATE POLICY "サービス作成者がタグを更新できる"
  ON public.tags
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM public.tag_list tl
      JOIN public.bookmarks b
        ON tl.bookmark_id = b.id
      JOIN public.services s
        ON b.service_id = s.id
      WHERE tl.id = public.tags.tag_list_id
        AND auth.uid()::text = s.created_user_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.tag_list tl
      JOIN public.bookmarks b
        ON tl.bookmark_id = b.id
      JOIN public.services s
        ON b.service_id = s.id
      WHERE tl.id = tag_list_id
        AND auth.uid()::text = s.created_user_id
    )
  );

CREATE POLICY "サービス作成者がタグを削除できる"
  ON public.tags
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.tag_list tl
      JOIN public.bookmarks b
        ON tl.bookmark_id = b.id
      JOIN public.services s
        ON b.service_id = s.id
      WHERE tl.id = public.tags.tag_list_id
        AND auth.uid()::text = s.created_user_id
    )
  );
