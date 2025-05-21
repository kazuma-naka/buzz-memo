'use client';

import { useState } from 'react';
import { registerServiceAction } from '@/actions/services';
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
  const [serviceName, setServiceName] = useState('');
  const [serviceUrl, setServiceUrl] = useState('');

  const isValid = serviceName.trim() !== '' && serviceUrl.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
            group relative flex items-center
            bg-[#F0EEE6] hover:bg-[#5C8DEC] hover:text-white
            text-black text-base font-bold uppercase
            px-6 py-3 rounded-full cursor-pointer
            transition-all duration-300 ease-in-out
            overflow-hidden mb-4
          "
        >
          <span
            className="
              absolute left-6 text-white text-xl
              opacity-0 -translate-x-4
              transition-all duration-500 ease-[cubic-bezier(.25,.8,.25,1)]
              group-hover:translate-x-0 group-hover:opacity-100
            "
          >
            ＋
          </span>
          <span className="ml-8">サービスの新規登録</span>
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          max-w-lg mx-auto flex flex-col gap-4 h-auto
          bg-[#F0EEE6] text-black px-8 pb-8
        "
      >
        <form
          action={async (formData: FormData) => {
            try {
              await registerServiceAction({
                serviceName,
                serviceUrl,
                userId,
                userEmail,
              });
              onRegistered?.();
              setOpen(false);
              setServiceName('');
              setServiceUrl('');
            } catch (err: any) {
              console.error(err);
              alert(err.message);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-black font-bold">
              サービス登録
            </DialogTitle>
            <DialogDescription className="text-[#222222] mt-2 mb-3">
              登録したいサービスの名前とページIDを入力してください。
              <span className="block text-sm text-red-500 mt-1">
                ※ページIDは後から変更できませんのでご注意ください。
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="serviceName" className="mb-2">
                サービス名
              </Label>
              <Input
                id="serviceName"
                name="serviceName"
                placeholder="例: Buzz Memo"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.currentTarget.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="serviceUrl" className="mb-2">
                ページID
              </Label>
              <Input
                id="serviceUrl"
                name="serviceUrl"
                type="text"
                placeholder="例: /buzz_memo"
                required
                value={serviceUrl}
                onChange={(e) => setServiceUrl(e.currentTarget.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className={`
              block w-1/2 mx-auto mt-6 text-white
              ${
                isValid
                  ? 'bg-[#5C8DEC] hover:bg-[#4B7ECC]'
                  : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            登録する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
