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
