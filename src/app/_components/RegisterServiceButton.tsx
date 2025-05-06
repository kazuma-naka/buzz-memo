'use client';

import { useState } from 'react';
import { registerServiceAction } from '@/actions/registerService';
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          サービスの新規登録
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6">
        <form
          action={async (formData: FormData) => {
            try {
              const serviceName = formData.get('serviceName')?.toString() ?? '';
              const serviceUrl = formData.get('serviceUrl')?.toString() ?? '';

              await registerServiceAction({
                serviceName,
                serviceUrl,
                userId,
                userEmail,
              });

              onRegistered?.();
              setOpen(false);
            } catch (err: any) {
              console.error(err);
              alert(err.message);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>サービス登録</DialogTitle>
            <DialogDescription>
              サービス名とページIDを入力してください。※ページIDは後から変更できません
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="serviceName">サービス名</Label>
              <Input
                id="serviceName"
                name="serviceName"
                placeholder="例: Buzz Memo"
                required
              />
            </div>
            <div>
              <Label htmlFor="serviceUrl">ページID</Label>
              <Input
                id="serviceUrl"
                name="serviceUrl"
                type="url"
                placeholder="例: buzzmemo.com/buzz_memo"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-6">
            登録する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
