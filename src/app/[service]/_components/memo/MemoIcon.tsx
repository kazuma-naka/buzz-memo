'use client';

import React from 'react';
import IconButton from '@/components/IconButton';
import { FileText } from 'lucide-react';

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MemoIcon({ onClick }: Props) {
  return (
    <IconButton
      ariaLabel="メモを編集"
      tooltip="メモを編集"
      onClick={onClick}
      width="8"
      height="8"
    >
      <FileText className="w-6 h-6 text-gray-600" />
    </IconButton>
  );
}
