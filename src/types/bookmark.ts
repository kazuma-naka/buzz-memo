export interface Bookmark {
  id: string;
  title: string;
  last_updated_user_id: string;
  description: string | null;
  favicon_url: string | null;
  twitter_image_url: string | null;
  uploaded_date: string;
  is_visible: boolean;
  memo: string | null;
  url: string;
}
