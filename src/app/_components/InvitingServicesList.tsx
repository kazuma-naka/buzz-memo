import { Card, CardContent } from '@/components/ui/card';
import { InviteWithList } from '@/types/inviteWithList';
import { Service } from '@/types/service';
import { ListItemDeleteButton } from './ListItemButton';

interface InvitingServicesProps {
  services: Service[];
  invites: InviteWithList[];
  onDeleteInvite: (inviteId: string) => void;
}

export default function InvitingServicesList({
  services,
  invites,
  onDeleteInvite,
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
      <h2 className="text-lg font-bold mb-2">招待をしたサービス</h2>

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
                      <ListItemDeleteButton
                        onClick={() => onDeleteInvite(inv.id)}
                        buttonText="招待削除"
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p className="text-gray-500">(招待はありません)</p>
      )}
    </div>
  );
}
