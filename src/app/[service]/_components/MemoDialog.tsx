'use client';

import React from 'react';
import { X } from 'lucide-react';

interface MemoDialogProps {
  memos: string[];
  newMemo: string;
  editable: boolean;
  onMemoChange: (value: string) => void;
  onAddMemo: () => void;
  onRemoveMemo: (memo: string) => void;
  onClose: () => void;
}

export default function MemoDialog({
  memos,
  newMemo,
  editable,
  onMemoChange,
  onAddMemo,
  onRemoveMemo,
  onClose,
}: MemoDialogProps) {
  return (
    <div
      className="bg-white rounded-lg w-96 max-w-full p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">メモ</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 rounded-full"
          aria-label="閉じる"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {editable && (
        <div className="mb-4">
          <textarea
            value={newMemo}
            onChange={(e) => onMemoChange(e.target.value)}
            placeholder="新しいメモを入力"
            className="w-full h-24 p-2 border rounded-md resize-none focus:outline-none focus:ring"
          />
          <button
            onClick={onAddMemo}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            追加
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-3 max-h-64 overflow-auto">
        {memos.length > 0 ? (
          memos.map((memo) => (
            <div
              key={memo}
              className="relative bg-gray-50 p-3 rounded-md border"
            >
              <p className="whitespace-pre-wrap text-sm">{memo}</p>
              {editable && (
                <button
                  onClick={() => onRemoveMemo(memo)}
                  className="absolute top-1 right-1 p-1 hover:bg-gray-200 rounded-full"
                  aria-label="メモを削除"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">まだメモがありません</p>
        )}
      </div>
    </div>
  );
}
