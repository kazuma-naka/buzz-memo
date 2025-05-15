// src/components/VisibilityToggle.tsx
'use client';

import React from 'react';
import IconButton from '@/components/IconButton';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  isVisible: boolean;
  onToggle: () => void;
}

export function VisibilityToggle({ isVisible, onToggle }: Props) {
  const textColor = isVisible ? 'text-gray-600' : 'text-[#FF6B6B]';

  return (
    <IconButton
      className={textColor}
      ariaLabel={isVisible ? '表示する' : '非表示にする'}
      tooltip={isVisible ? '表示' : '非表示'}
      onClick={onToggle}
      width="10"
      height="10"
    >
      {isVisible ? <Eye className="w-7 h-7" /> : <EyeOff className="w-7 h-7" />}
    </IconButton>
  );
}
