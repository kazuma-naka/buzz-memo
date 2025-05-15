'use client';

import React from 'react';
import IconButton from '@/components/IconButton';
import { Tag } from 'lucide-react';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TagIcon({ onClick }: Props) {
  return (
    <IconButton
      ariaLabel="タグを編集"
      tooltip="タグを編集"
      onClick={onClick}
      width="20"
      height="12"
    >
      <Tag className="w-6 h-6 text-gray-600" />
    </IconButton>
  );
}
