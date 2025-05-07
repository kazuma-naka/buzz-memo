import { Card, CardContent } from '@/components/ui/card';
import { ListItemDeleteButton, ListItemInviteButton } from '../ListItemButton';
import { Service } from '@/types/service';
import RegisteredServiceTitle from './RegisteredServiceTitle';

interface RegisteredServiceListProps {
  services: Service[];
}

export default function RegisteredServiceList({
  services,
}: RegisteredServiceListProps) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="bg-[#FAF9F5]">
          <CardContent>
            <div className="flex justify-between items-center">
              <RegisteredServiceTitle service={service} />
              <div className="flex gap-4">
                <ListItemInviteButton
                  onClick={() => {}}
                  buttonText="招待する"
                />
                <ListItemDeleteButton
                  onClick={() => {}}
                  buttonText="削除する"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
