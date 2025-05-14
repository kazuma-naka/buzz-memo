'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { ListItemDeleteButton } from '../ListItemButton';
import RegisteredServiceTitle from './RegisteredServiceTitle';
import InviteUserDialog from '@/app/_components/InviteUserDialog';
import { Service } from '@/types/service';
import { deleteService } from '@/actions/service_client';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const handleDelete = () => {
    const confirmedDeleteService = window.confirm(
      '本当にこのサービスを削除してもよろしいですか？この操作は取り消せません。',
    );
    if (!confirmedDeleteService) return;
    deleteService(service.id);
    redirect('/');
  };

  return (
    <Card className="bg-[#FAF9F5]">
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="w-full">
            <RegisteredServiceTitle service={service} />
          </div>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <InviteUserDialog service={service} />
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
