// app/_components/InvitedServicesList.tsx
import { fetchServicesByIdList } from '@/actions/services';
import { Card, CardContent } from '@/components/ui/card';
import { InviteWithList } from '@/types/inviteWithList';
import { Service } from '@/types/service';
import Link from 'next/link';

interface InvitedServicesProps {
  invites: InviteWithList[];
  userId: string;
}

export default async function InvitedServicesList({
  invites,
  userId,
}: InvitedServicesProps) {
  const formatStatus = (s: number) =>
    s === 0 ? '処理中' : s === 1 ? '招待済' : s === 2 ? 'キャンセル' : '';

  const invitesPerUser = invites.filter(
    (inv) => inv.invited_user_id === userId,
  );
  if (invitesPerUser.length === 0) {
    return <p className="text-gray-500">招待はありません。</p>;
  }

  const serviceIdSet = new Set(
    invitesPerUser.flatMap((inv) => {
      const lists = Array.isArray(inv.invite_lists)
        ? inv.invite_lists
        : inv.invite_lists
          ? [inv.invite_lists]
          : [];
      return lists
        .map((list) => list.service_id)
        .filter((id): id is string => Boolean(id));
    }),
  );
  if (serviceIdSet.size === 0) {
    return <p className="text-gray-500">招待はありません。</p>;
  }

  let services: Service[];
  try {
    services = await fetchServicesByIdList([...serviceIdSet]);
  } catch (err: any) {
    return <p className="text-red-600">サービス取得エラー: {err.message}</p>;
  }

  const serviceMap = Object.fromEntries(
    services.map((svc) => [svc.id, svc]),
  ) as Record<string, Service>;

  const cards = invitesPerUser.flatMap((inv) => {
    const lists = Array.isArray(inv.invite_lists)
      ? inv.invite_lists
      : inv.invite_lists
        ? [inv.invite_lists]
        : [];

    return lists.map((list) => {
      const svc = serviceMap[list.service_id];
      return (
        <Card
          key={`${inv.id}-${list.service_id}`}
          className="bg-[#FAF9F5] mb-4"
        >
          <CardContent>
            <Link
              href={`/${svc?.path ?? ''}`}
              className="text-xl font-semibold hover:underline cursor-pointer mb-2 block"
            >
              {svc?.title ?? 'Unknown Service'}
            </Link>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 mr-2">
                buzzmemo.jp/{svc?.path}
              </span>
            </div>
          </CardContent>
        </Card>
      );
    });
  });

  return (
    <div>
      {cards.length > 0 ? (
        cards
      ) : (
        <p className="text-gray-500">招待はありません。</p>
      )}
    </div>
  );
}
