'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { deleteInvite } from '@/actions/invites_client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface InviteUserDeleteButtonProps {
  buttonText: string;
  inviteId: string;
}

const InviteUserDeleteButton: FC<InviteUserDeleteButtonProps> = ({
  buttonText,
  inviteId,
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteInvite(inviteId);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete invite:', error);
    }
  };

  return (
    <Button
      onClick={handleDelete}
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

export default InviteUserDeleteButton;
