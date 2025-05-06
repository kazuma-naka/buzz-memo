'use client';

import { SetStateAction, useState } from 'react';
import { useRegisterService } from '@/hooks/useRegisterService';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Props = {
  userId?: string;
  userEmail: string;
  onRegistered?: () => void;
};

export default function RegisterServiceButton({
  userId,
  userEmail,
  onRegistered,
}: Props) {
  const [open, setOpen] = useState(false);
  const {
    serviceName,
    setServiceName,
    serviceUrl,
    setServiceUrl,
    nameError,
    urlError,
    loading,
    handleSubmit,
  } = useRegisterService({ userId, userEmail, onRegistered });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative flex items-center bg-[#F0EEE6] hover:bg-[#5C8DEC] hover:text-white text-black text-base font-bold uppercase px-6 py-3 rounded-full transition-all duration-300 ease-in-out overflow-hidden mb-4">
          <span className="absolute left-6 text-white text-xl opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(.25,.8,.25,1)] group-hover:translate-x-0 group-hover:opacity-100">
            ＋
          </span>
          <span className="ml-8">サービスの新規登録</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg mx-auto flex flex-col gap-4 bg-[#F0EEE6] text-black px-8 pb-8">
        <DialogHeader>
          <DialogTitle className="font-bold">サービス登録</DialogTitle>
          <DialogDescription>
            サービス名とページIDを入力してください。
            <span className="block text-sm text-red-500">
              ※ページIDは後から変更できません
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="serviceName">サービス名</Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setServiceName(e.target.value)
              }
              placeholder="例: Buzz Memo"
            />
            {nameError && <p className="text-[#A05A5A] text-sm">{nameError}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="serviceUrl">ページID</Label>
            <Input
              id="serviceUrl"
              type="url"
              value={serviceUrl}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setServiceUrl(e.target.value)
              }
              placeholder="例: buzzmemo.com/buzz_memo"
            />
            {urlError && <p className="text-red-400 text-sm">{urlError}</p>}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#5C8DEC] text-white w-1/2 mx-auto mt-2"
          >
            {loading ? '登録中...' : '登録する'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
