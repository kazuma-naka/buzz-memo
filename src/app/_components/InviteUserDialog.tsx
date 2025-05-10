'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Paperclip } from 'lucide-react';
import { ListItemInviteButton } from '@/app/_components/ListItemButton';
import { sendInviteToUser } from '@/actions/sendInvite';

export default function InviteUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteToken, setInviteToken] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleOpen = () => {
    const token = Math.random().toString().slice(2);
    const url = `${window.location.origin}/invite/${token}`;
    setInviteToken(token);
    setInviteUrl(url);
    setIsOpen(true);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(inviteUrl);
  };

  const handleCreateMail = () => {
    const inviteUrl = `${window.location.origin}/invite/${inviteToken}`;
    sendInviteToUser(inviteEmail, inviteUrl);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setInviteEmail('');
          setInviteToken('');
          setInviteUrl('');
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <ListItemInviteButton onClick={handleOpen} buttonText="招待する" />
      </DialogTrigger>
      <DialogContent className="bg-[#F0EEE6] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <DialogHeader>
          <DialogTitle>ユーザーを招待する</DialogTitle>
          <DialogDescription>招待メールを作成します</DialogDescription>
        </DialogHeader>
        <div className="px-4 py-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            招待先メールアドレス
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          {inviteEmail && !isEmailValid(inviteEmail) && (
            <p className="text-sm text-red-500">
              有効なメールアドレスを入力してください
            </p>
          )}
          <button
            onClick={handleCreateMail}
            disabled={!inviteEmail || !isEmailValid(inviteEmail)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:bg-gray-400"
          >
            招待する
          </button>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <Paperclip className="w-4 h-4" />
              <span>リンクをコピー</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
