CREATE TABLE IF NOT EXISTS public.invite_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL,
    created_user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT fk_service FOREIGN KEY (service_id)
        REFERENCES public.services(id) ON DELETE CASCADE,
    CONSTRAINT fk_inviting_user FOREIGN KEY (created_user_id)
        REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.invite_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "自分が作成する招待リストのみ挿入可"
  ON public.invite_lists
  FOR INSERT
  WITH CHECK (auth.uid()::text = created_user_id);

CREATE POLICY "全員が選択可能"
  ON public.invite_lists
  FOR SELECT
  USING (
    true
  );
