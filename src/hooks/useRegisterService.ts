import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type UseRegisterServiceProps = {
  userId?: string;
  userEmail: string;
  maxServices?: number;
  onRegistered?: () => void;
};

export function useRegisterService({
  userId,
  userEmail,
  maxServices = 2,
  onRegistered,
}: UseRegisterServiceProps) {
  const [serviceName, setServiceName] = useState('');
  const [serviceUrl, setServiceUrl] = useState('');
  const [nameError, setNameError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setServiceName('');
    setServiceUrl('');
    setNameError('');
    setUrlError('');
  };

  const handleSubmit = async () => {
    let hasError = false;
    if (!serviceName.trim()) {
      setNameError('サービス名を入力してください。');
      hasError = true;
    } else setNameError('');
    if (!serviceUrl.trim()) {
      setUrlError('Pathを入力してください。');
      hasError = true;
    } else setUrlError('');
    if (hasError) return;

    setLoading(true);
    const supabase = createClient();

    const { data: existing, error: selectError } = await supabase
      .from('services')
      .select('id')
      .eq('path', serviceUrl)
      .maybeSingle();
    if (selectError) {
      console.error(selectError);
      setLoading(false);
      return;
    }
    if (existing) {
      setUrlError('このPathは既に登録されています。');
      setLoading(false);
      return;
    }

    const { count, error: countError } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('created_user_id', userId);
    if (countError) {
      console.error(countError);
      setLoading(false);
      return;
    }
    if ((count ?? 0) >= maxServices) {
      setUrlError(`サービスの登録は${maxServices}件までです。`);
      setLoading(false);
      return;
    }

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
    if (insertError) {
      console.error(insertError);
      setLoading(false);
      return;
    }

    const { error: inviteError } = await supabase
      .from('invite_lists')
      .insert([{ service_id: inserted.id, created_user_id: userId }]);
    if (inviteError) {
      console.error(inviteError);
      setLoading(false);
      return;
    }

    reset();
    setLoading(false);
    onRegistered?.();
  };

  return {
    serviceName,
    setServiceName,
    serviceUrl,
    setServiceUrl,
    nameError,
    urlError,
    loading,
    handleSubmit,
  };
}
