CREATE TABLE IF NOT EXISTS public.tag_list (
     id uuid primary key default gen_random_uuid(),
     bookmark_id uuid not null,
     created_at timestamptz not null default timezone('utc', now()),
     updated_at timestamptz not null default timezone('utc', now()),
     constraint fk_bookmark_id foreign key (bookmark_id) references public.bookmarks(id) on delete cascade
 );
 
 ALTER TABLE public.tag_list
   ENABLE ROW LEVEL SECURITY;
 
 CREATE POLICY "自分のブックマークにタグを追加できる"
   ON public.tag_list
   FOR INSERT
   WITH CHECK (
     EXISTS (
       SELECT 1
       FROM public.bookmarks b
       WHERE b.id = tag_list.bookmark_id
         AND auth.uid()::text = b.last_updated_user_id
     )
   );
 
 CREATE POLICY "自分のブックマークのタグを参照できる"
   ON public.tag_list
   FOR SELECT
   USING (
     EXISTS (
       SELECT 1
       FROM public.bookmarks b
       WHERE b.id = tag_list.bookmark_id
         AND auth.uid()::text = b.last_updated_user_id
     )
   );
 
 CREATE POLICY "自分のブックマークのタグを更新できる"
   ON public.tag_list
   FOR UPDATE
   USING (
     EXISTS (
       SELECT 1
       FROM public.bookmarks b
       WHERE b.id = tag_list.bookmark_id
         AND auth.uid()::text = b.last_updated_user_id
     )
   )
   WITH CHECK (
     EXISTS (
       SELECT 1
       FROM public.bookmarks b
       WHERE b.id = tag_list.bookmark_id
         AND auth.uid()::text = b.last_updated_user_id
     )
   );
 
 CREATE POLICY "自分のブックマークのタグを削除できる"
   ON public.tag_list
   FOR DELETE
   USING (
     EXISTS (
       SELECT 1
       FROM public.bookmarks b
       WHERE b.id = tag_list.bookmark_id
         AND auth.uid()::text = b.last_updated_user_id
     )
   );
