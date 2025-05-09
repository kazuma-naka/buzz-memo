import { fetchServicesByIdList } from '@/actions/services';
import { Card, CardContent } from '@/components/ui/card';
import { InviteWithList } from '@/types/inviteWithList';
import { Service } from '@/types/service';
import Link from 'next/link';
import { ListItemDeleteButton } from './ListItemButton';

interface InvitedServicesProps {
  invites: InviteWithList[];
  userId: string;
  onDeleteInvite: (inviteId: string) => void;
}

export default async function InvitedServices({
  invites,
  userId,
  onDeleteInvite,
}: InvitedServicesProps) {
  const formatStatus = (s: number) =>
    s === 0 ? '処理中' : s === 1 ? '招待済' : s === 2 ? 'キャンセル' : '';

  const invitesPerUser = invites.filter(
    (inv) => inv.invited_user_id === userId,
  );

  if (invitesPerUser.length === 0) {
    return <p className="text-gray-500">招待はありません。</p>;
  }

  const serviceIds = Array.from(
    new Set(
      invitesPerUser
        .map((inv) => inv.invite_lists[0]?.service_id)
        .filter((id): id is string => Boolean(id)),
    ),
  );

  let services: Service[];
  try {
    services = await fetchServicesByIdList(serviceIds);
  } catch (err: any) {
    return <p className="text-red-600">サービス取得エラー: {err.message}</p>;
  }

  const serviceMap = Object.fromEntries(
    services.map((svc) => [svc.id, svc]),
  ) as Record<string, Service>;

  return (
    <div>
      {invitesPerUser.map((inv) => {
        const listItem = inv.invite_lists[0];
        if (!listItem) return null;

        const svc = serviceMap[listItem.service_id];
        return (
          <Card key={inv.id} className="bg-[#FAF9F5] mb-4">
            <CardContent>
              <Link
                href={`/${svc?.path ?? ''}`}
                className="text-xl font-semibold hover:underline cursor-pointer mb-2 block"
              >
                {svc?.title ?? 'Unknown Service'}
              </Link>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600 mr-2">
                    ({formatStatus(inv.status)})
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(inv.expired_at).toLocaleString()}
                  </span>
                </div>
                <ListItemDeleteButton
                  onClick={() => onDeleteInvite(inv.id)}
                  buttonText="招待削除"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
