'use client';

import React from 'react';
import IconButton from '@/components/IconButton';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  editHref: string;
}

export function EditBookmarkButton({ editHref }: Props) {
  const router = useRouter();
  return (
    <IconButton
      ariaLabel="編集する"
      tooltip="編集する"
      onClick={() => router.push(editHref)}
      width="20"
      height="11"
    >
      <Edit className="w-6 h-6 text-gray-600" />
    </IconButton>
  );
}
