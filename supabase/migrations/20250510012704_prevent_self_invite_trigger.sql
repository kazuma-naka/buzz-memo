CREATE OR REPLACE FUNCTION public.prevent_self_invite()
RETURNS trigger AS $$
BEGIN
  IF NEW.invited_user_id = (
       SELECT created_user_id
         FROM public.invite_lists
        WHERE id = NEW.invite_list_id
     )
  THEN
    RAISE EXCEPTION 'Cannot invite yourself to your own list';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_no_self_invite
  BEFORE INSERT OR UPDATE ON public.invite
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_invite();
