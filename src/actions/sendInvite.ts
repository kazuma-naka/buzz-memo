'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendInviteToUser(email: string, url: string) {
  try {
    await resend.emails.send({
      from: 'noreply@resend.dev',
      to: 'delivered@resend.dev',
      subject: 'サービスへのご招待',
      html: `
        <p>こちらのリンクからサービスに参加してください：</p>
        <a href="${url}">${url}</a>
      `,
    });
  } catch (err: any) {
    console.error('Resend error:', err);
    throw new Error('招待メールの送信に失敗しました');
  }
}
