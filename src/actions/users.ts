'use server';

import { createClient } from '@/lib/supabase/server';

export async function getUserIdByEmail(email: string): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }
  if (!data) {
    throw new Error(`User with email ${email} not found.`);
  }
  return data.id;
}
