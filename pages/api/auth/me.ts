import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';

import { checkIfUserExists } from 'utils/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string } | { user: Partial<User> }>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Only GET requests allowed' });
    return;
  }
  try {
    const { cookies } = req;

    if (!cookies.token) {
      res.status(401).json({ error: 'No session found' });
      return;
    }

    const payload: any = jwt.verify(
      cookies.token,
      process.env.JWT_SECRET || ''
    );

    if (!payload?.email) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    const user = await checkIfUserExists(payload.email);

    if (!user.user || !user.exists) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ user: { ...user.user, password: undefined } });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}
