'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ListItemDeleteButton, ListItemInviteButton } from '../ListItemButton';
import RegisteredServiceTitle from './RegisteredServiceTitle';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const handleInvite = () => {
    console.log('invite', service.id);
  };

  const handleDelete = () => {
    console.log('delete', service.id);
  };

  return (
    <Card className="bg-[#FAF9F5]">
      <CardContent>
        <div className="flex justify-between items-center">
          <RegisteredServiceTitle service={service} />
          <div className="flex gap-4">
            <ListItemInviteButton
              onClick={handleInvite}
              buttonText="招待する"
            />
            <ListItemDeleteButton
              onClick={handleDelete}
              buttonText="削除する"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
