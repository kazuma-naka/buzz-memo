'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface Params {
  serviceName: string;
  serviceUrl: string;
  userId?: string;
  userEmail: string;
}

export async function registerServiceAction({
  serviceName,
  serviceUrl,
  userId,
  userEmail,
}: Params) {
  if (!serviceName.trim() || !serviceUrl.trim()) {
    throw new Error('サービス名とページIDを入力してください。');
  }

  const supabase = await createClient();

  const { data: existing, error: selectError } = await supabase
    .from('services')
    .select('id')
    .eq('path', serviceUrl)
    .maybeSingle();
  if (selectError) throw selectError;
  if (existing) throw new Error('このPathは既に登録されています。');

  const { count, error: countError } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })
    .eq('created_user_id', userId);
  if (countError) throw countError;
  if ((count ?? 0) >= 2) throw new Error('サービスの登録は2件までです。');

  const { data: inserted, error: insertError } = await supabase
    .from('services')
    .insert([
      {
        created_user_id: userId,
        title: serviceName,
        path: serviceUrl,
        user_email: userEmail,
      },
    ])
    .select('id')
    .single();
  if (insertError) throw insertError;

  const { error: inviteError } = await supabase
    .from('invite_lists')
    .insert([{ service_id: inserted.id, created_user_id: userId }]);
  if (inviteError) throw inviteError;

  revalidatePath('/');
}
