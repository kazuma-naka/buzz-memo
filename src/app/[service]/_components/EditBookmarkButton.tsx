'use client';

import React from 'react';
import router from 'next/router';
import { Edit } from 'lucide-react';

interface EditBookmarkButtonProps {
  editHref: string;
}

export const EditBookmarkButton: React.FC<EditBookmarkButtonProps> = ({
  editHref,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(editHref);
      }}
      className="group p-2 bg-white rounded-full hover:bg-gray-200 flex items-center"
      aria-label="Edit bookmark"
    >
      <Edit className="transition-transform group-hover:-translate-x-1 w-6 h-6 text-gray-600" />
      <span className="hidden group-hover:inline-block ml-1 text-sm text-gray-800 whitespace-nowrap">
        編集する
      </span>
    </button>
  );
};
