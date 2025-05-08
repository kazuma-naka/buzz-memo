CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    title TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT fk_user_id FOREIGN KEY (created_user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.services;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公開サービスを誰でも読める"
  ON public.services
  FOR SELECT
  USING (true);

CREATE POLICY "認証ユーザーは自分のユーザーIDでのみサービスを追加できる"
  ON public.services
  FOR INSERT
  WITH CHECK (auth.uid()::text = created_user_id);

CREATE POLICY "サービスの作成者自身がサービスを更新できる"
  ON public.services
  FOR UPDATE
  USING (auth.uid()::text = created_user_id)
  WITH CHECK (auth.uid()::text = created_user_id);

CREATE POLICY "サービスの作成者自身がサービスを削除できる"
  ON public.services
  FOR DELETE
  USING (auth.uid()::text = created_user_id);
