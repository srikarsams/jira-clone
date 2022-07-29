import type { NextApiRequest, NextApiResponse } from 'next';
import { hashSync } from 'bcrypt';
import { z, ZodError } from 'zod';

import { db } from 'prisma/db';
import { APIError, RegisterKeys } from 'types';
import { User } from '@prisma/client';

export interface EmailSuccess {
  ok: boolean;
}

const registerPayloadValidator = z.object({
  email: z.string().email({ message: 'Invalid Email. Please check again' }),
  password: z
    .string()
    .min(6, { message: 'Password should be atleast 6 characters long.' })
    .max(24, { message: 'Password should be lower than 24 characters.' }),
});

const registerEmailPayloadValidator = z.object({
  email: z.string().email({ message: 'Invalid Email. Please check again' }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    APIError<typeof RegisterKeys> | Partial<User> | EmailSuccess
  >
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res
      .status(405)
      .json({ fieldErrors: { form: 'Only POST/GET requests allowed' } });
    return;
  }

  // for verifying whether the email already exists
  if (req.method === 'GET') {
    try {
      const emailPayload = validateRegisterEmailPayload(
        req.query.email as string
      );

      await checkIfUserExists(emailPayload.email);

      res.status(200).json({ ok: true });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error.flatten());
        return;
      }
      res
        .status(400)
        .json({ fieldErrors: { email: (error as Error).message } });
    }

    return;
  }

  try {
    const registerPayload = validateRegisterPayload(req);

    const user = await db.user.findUnique({
      where: {
        email: registerPayload.email,
      },
    });

    if (user?.email) {
      res.status(400).send({ fieldErrors: { email: 'User already exists' } });
    }

    registerPayload.password = hashSync(registerPayload.password, 12);

    const newUser = await db.user.create({
      data: registerPayload,
      select: {
        email: true,
        id: true,
      },
    });

    res.status(200).json(newUser);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(error.flatten());
      return;
    }
    res.status(400).json({ fieldErrors: { form: (error as Error).message } });
  }
}

function validateRegisterPayload(req: NextApiRequest) {
  return registerPayloadValidator.parse(req.body);
}

function validateRegisterEmailPayload(email: string) {
  return registerEmailPayloadValidator.parse({ email });
}

async function checkIfUserExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user?.email) {
    console.log('d');
    throw new Error('User already exists');
  }
}
