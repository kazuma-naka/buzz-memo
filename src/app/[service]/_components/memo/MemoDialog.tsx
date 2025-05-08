'use client';

import React from 'react';
import { X } from 'lucide-react';

interface MemoDialogProps {
  originalMemo: string;
  editedMemo: string;
  editable: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function MemoDialog({
  originalMemo,
  editedMemo,
  editable,
  onChange,
  onSave,
  onClose,
}: MemoDialogProps) {
  const hasChanged = editedMemo.trim() !== originalMemo.trim();

  return (
    <div
      className="bg-white rounded-lg w-96 max-w-full p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">メモを編集</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full"
          aria-label="閉じる"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <textarea
        value={editedMemo}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!editable}
        className="w-full h-40 p-2 border rounded-md resize-none focus:outline-none focus:ring"
      />

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          キャンセル
        </button>
        {editable && hasChanged && (
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            保存
          </button>
        )}
      </div>
    </div>
  );
}
