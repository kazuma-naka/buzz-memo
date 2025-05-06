CREATE OR REPLACE FUNCTION public.create_tag_list_for_new_bookmark()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.tag_list (bookmark_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_bookmarks_after_insert
  AFTER INSERT
  ON public.bookmarks
  FOR EACH ROW
EXECUTE FUNCTION public.create_tag_list_for_new_bookmark();
