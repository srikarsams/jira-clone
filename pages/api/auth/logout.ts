import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean } | { error: string }>
) {
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Only POST requests allowed' });
    return;
  }

  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })
    );

    res.status(200).json({ success: true });
    return;
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
