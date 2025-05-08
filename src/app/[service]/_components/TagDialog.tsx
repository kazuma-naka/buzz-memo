'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TagDialogProps {
  tags: string[];
  newTag: string;
  editable: boolean;
  onTagChange: (v: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onClose: () => void;
}

export default function TagDialog({
  tags,
  newTag,
  editable,
  onTagChange,
  onAddTag,
  onRemoveTag,
  onClose,
}: TagDialogProps) {
  return (
    <div
      className="bg-white rounded-lg w-80 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">タグ</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          aria-label="閉じる"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {editable && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => onTagChange(e.target.value)}
            placeholder="タグを追加"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={onAddTag}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            追加
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="inline-flex items-center space-x-1 rounded-full"
            >
              <span className="px-2 py-1">{tag}</span>
              {editable && (
                <button
                  onClick={() => onRemoveTag(tag)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                  aria-label={`${tag} を削除`}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-gray-500">まだタグがありません</p>
        )}
      </div>
    </div>
  );
}
