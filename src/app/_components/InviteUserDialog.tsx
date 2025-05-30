'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Paperclip, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ListItemInviteButton } from '@/app/_components/ListItemButton';
import { sendInviteToUser } from '@/actions/sendInvite';
import { Service } from '@/types/service';
import {
  getInviteListByServiceId,
  insertInvite,
} from '@/actions/invites_client';

interface InviteUserDialogProps {
  service: Service;
}

export default function InviteUserDialog({ service }: InviteUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteToken, setInviteToken] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearForm = () => {
    setInviteEmail('');
    setInviteToken('');
    setInviteUrl('');
  };

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

  const handleCreateMail = async () => {
    if (!isEmailValid(inviteEmail)) return;
    setIsLoading(true);
    try {
      const url = `${window.location.origin}/invite/${inviteToken}`;
      const inviteList = await getInviteListByServiceId(service.id);
      if (!inviteList?.id) {
        console.error('no invite_list found for service', service.id);
        return;
      }
      await insertInvite(inviteList.id, inviteToken, inviteEmail);
      await sendInviteToUser(inviteEmail, url);

      setIsOpen(false);
      clearForm();

      router.refresh();
    } catch (error) {
      console.error('failed to create & send invite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) clearForm();
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
        <div className="py-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            招待先メールアドレス
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            disabled={isLoading}
          />
          {inviteEmail && !isEmailValid(inviteEmail) && (
            <p className="text-sm text-red-500">
              有効なメールアドレスを入力してください
            </p>
          )}
          <motion.button
            onClick={handleCreateMail}
            disabled={!inviteEmail || !isEmailValid(inviteEmail) || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:bg-gray-400 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>送信中…</span>
              </>
            ) : (
              <span>招待する</span>
            )}
          </motion.button>
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4" />
              <span>招待リンクをコピー</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
