CREATE TABLE IF NOT EXISTS public.invite (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invite_list_id UUID NOT NULL,
    invited_user_id TEXT,
    invited_user_email TEXT,
    token TEXT NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    expired_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '1 day'),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now()),
    FOREIGN KEY (invite_list_id) REFERENCES public.invite_lists(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_user_id) REFERENCES public.users(id)
);

ALTER TABLE public.invite ENABLE ROW LEVEL SECURITY;

CREATE POLICY "招待リスト作成者のみ招待を作成可"
  ON public.invite
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.invite_lists il
      WHERE il.id = invite_list_id
        AND il.created_user_id = auth.uid()::text
    )
  );

CREATE POLICY "作成者および招待相手のみ閲覧可"
  ON public.invite
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.invite_lists il
      WHERE il.id = invite_list_id
        AND il.created_user_id = auth.uid()::text
    )
    OR invited_user_id = auth.uid()::text
  );

CREATE POLICY "招待リスト作成者のみ削除可"
  ON public.invite
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.invite_lists il
      WHERE il.id = invite_list_id
        AND il.created_user_id = auth.uid()::text
    )
  );

CREATE POLICY "招待相手はメール一致なら閲覧可"
  ON public.invite
  FOR SELECT
  TO authenticated
  USING (
         invited_user_id = auth.uid()::text
      OR (status = 0
          AND invited_user_email = auth.jwt() ->> 'email')
      OR EXISTS (
          SELECT 1 FROM public.invite_lists il
          WHERE il.id = invite_list_id
            AND il.created_user_id = auth.uid()::text)
  );

CREATE POLICY "招待相手のみ承諾可"
  ON public.invite
  FOR UPDATE
  TO authenticated
  USING (
         status = 0
     AND invited_user_email = auth.jwt() ->> 'email'
  )
  WITH CHECK (        
         status = 1
     AND invited_user_id   = auth.uid()::text
     AND invited_user_email = auth.jwt() ->> 'email'
  );
