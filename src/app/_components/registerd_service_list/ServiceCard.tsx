'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ListItemDeleteButton } from '../ListItemButton';
import RegisteredServiceTitle from './RegisteredServiceTitle';
import InviteUserDialog from '@/app/_components/InviteUserDialog';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const handleDelete = () => {
    console.log('delete', service.id);
  };

  return (
    <Card className="bg-[#FAF9F5]">
      <CardContent>
        <div className="flex justify-between items-center">
          <RegisteredServiceTitle service={service} />
          <div className="flex gap-4">
            <InviteUserDialog serviceId={service.id} />
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
