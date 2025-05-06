'use server';

import { createClient } from '@/lib/supabase/server';

type CreateUserArgs = {
  userId?: string;
  userName: string | undefined | null;
  userEmail?: string | undefined | null;
  userImage?: string | undefined | null;
};

export async function createUserIfNotExists({
  userId,
  userName,
  userEmail,
  userImage,
}: CreateUserArgs) {
  const supabase = await createClient();
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error checking user existence:', fetchError);
    throw new Error('Failed to check user existence');
  }

  if (!existingUser) {
    const { data, error } = await supabase.from('users').insert([
      {
        id: userId,
        name: userName,
        email: userEmail,
        image: userImage,
      },
    ]);
    if (error) {
      console.error('Insert failed:', error);
      throw new Error('Failed to insert user');
    }
    console.log('Inserted user:', data);
  } else {
    console.log('User already exists:', existingUser.id);
  }
}
