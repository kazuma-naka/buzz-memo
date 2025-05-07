'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, X } from 'lucide-react';

type ListItemButtonProps = {
  onClick: () => void;
  buttonText: string;
};

export const ListItemInviteButton: React.FC<ListItemButtonProps> = ({
  onClick,
  buttonText,
}) => {
  return (
    <Button
      onClick={onClick}
      className="
        group inline-flex items-center 
        w-fit px-4 py-2 
        bg-[#F0EEE6] hover:bg-[#D8D6CF] 
        text-[#1D343B] border border-[#222222] 
        ml-3 
        transition-all duration-200
      "
    >
      <span
        className="
          overflow-hidden inline-block 
          w-0 group-hover:w-4 
          transition-all duration-200
        "
      >
        <Mail className="w-4 h-4" />
      </span>
      <span
        className="
          ml-0 group-hover:ml-2 
          transition-all duration-200
        "
      >
        {buttonText}
      </span>
    </Button>
  );
};

export const ListItemDeleteButton: React.FC<ListItemButtonProps> = ({
  onClick,
  buttonText,
}) => {
  return (
    <Button
      onClick={onClick}
      className="
        group inline-flex items-center 
        w-fit px-4 py-2 
        bg-[#F0EEE6] hover:bg-[#D8D6CF] 
        text-[#A05A5A] border border-[#222222] 
        ml-3 
        transition-all duration-200
      "
    >
      <span
        className="
          overflow-hidden inline-block 
          w-0 group-hover:w-4 
          transition-all duration-200
        "
      >
        <X className="w-4 h-4" />
      </span>
      <span
        className="
          ml-0 group-hover:ml-2 
          transition-all duration-200
        "
      >
        {buttonText}
      </span>
    </Button>
  );
};
