import type { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcrypt';
import { z, ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { APIError, RegisterKeys } from 'types';
import { User } from '@prisma/client';
import { checkIfUserExists } from 'utils/api';

const loginPayloadValidator = z.object({
  email: z.string().email({ message: 'Invalid Email. Please check again' }),
  password: z.string().min(1, { message: 'Please enter the password' }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIError<typeof RegisterKeys> | Partial<User>>
) {
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ fieldErrors: { form: 'Only POST requests allowed' } });
    return;
  }

  try {
    const loginPayload = validateloginPayload(req);

    const { user } = await checkIfUserExists(loginPayload.email);

    if (!user?.email) {
      res.status(400).send({ fieldErrors: { email: "User doesn't exist" } });
      return;
    }

    const isPasswordValid = compareSync(
      loginPayload.password,
      user.password || ''
    );

    if (!isPasswordValid) {
      res.status(400).send({ fieldErrors: { password: 'Invalid password' } });
      return;
    }

    // Generates the token and sets the token in the res object
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || '');

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );
    res.status(200).json({
      ...user,
      password: undefined,
    });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(error.flatten());
      return;
    }
    res.status(400).json({ fieldErrors: { form: (error as Error).message } });
  }
}

function validateloginPayload(req: NextApiRequest) {
  return loginPayloadValidator.parse(req.body);
}
