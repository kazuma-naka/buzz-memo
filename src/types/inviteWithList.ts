export interface InviteWithList {
  id: string;
  token: string;
  status: number;
  expired_at: string;
  invited_user_id: string | null;
  invite_lists: {
    service_id: string;
    created_user_id: string;
  }[];
}
