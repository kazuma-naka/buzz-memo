import { Card, CardContent } from '@/components/ui/card';
import { InviteWithList } from '@/types/inviteWithList';
import { Service } from '@/types/service';
import InviteUserDeleteButton from './InviteUserDeleteButton';

interface InvitingServicesProps {
  services: Service[];
  invites: InviteWithList[];
}

export default function InvitingServicesList({
  services,
  invites,
}: InvitingServicesProps) {
  const statusLabels = ['処理中', '招待済', 'キャンセル'];
  const unwrapList = (inv: InviteWithList) =>
    Array.isArray(inv.invite_lists) ? inv.invite_lists[0] : inv.invite_lists;
  const grouped = invites.reduce<Record<string, InviteWithList[]>>(
    (acc, inv) => {
      const list = unwrapList(inv);
      if (!list) return acc;
      const svcId = list.service_id;
      if (!acc[svcId]) acc[svcId] = [];
      acc[svcId].push(inv);
      return acc;
    },
    {},
  );

  return (
    <div>
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([svcId, invList]) => {
          const service = services.find((s) => s.id === svcId);
          return (
            <Card key={svcId} className="bg-[#FAF9F5] mb-4">
              <CardContent>
                <div className="font-semibold mb-2">
                  {service?.title ?? svcId}
                </div>
                <ul className="space-y-2">
                  {invList.map((inv) => (
                    <li
                      key={inv.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="text-sm text-gray-600 mr-2">
                          ({statusLabels[inv.status] ?? '不明'})
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(inv.expired_at).toLocaleString()}
                        </span>
                      </div>
                      <InviteUserDeleteButton
                        buttonText="招待削除"
                        inviteId={inv.id}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-gray-500">招待はありません</p>
      )}
    </div>
  );
}
