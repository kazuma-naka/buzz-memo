CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    image TEXT
);

ALTER TABLE
    public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザー自身が自分を更新できる" ON public.users FOR
UPDATE
    USING (auth.uid() :: text = id);

CREATE POLICY "ユーザー自身が自分を取得できる" ON public.users FOR
SELECT
    USING (auth.uid() :: text = id);

CREATE POLICY "認証ユーザーは自分のメールアドレスでユーザー検索可"
  ON public.users
  FOR SELECT
  USING ( auth.uid() IS NOT NULL AND email = current_setting('request.jwt.claims.email') );
