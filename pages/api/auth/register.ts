import type { NextApiRequest, NextApiResponse } from 'next';
import { hashSync } from 'bcrypt';
import { z, ZodError } from 'zod';

import { db } from 'prisma/db';
import { APIError, RegisterKeys } from 'types';
import { User } from '@prisma/client';
import { checkIfUserExists } from 'utils/api';

const registerPayloadValidator = z.object({
  email: z.string().email({ message: 'Invalid Email. Please check again' }),
  password: z
    .string()
    .min(6, { message: 'Password should be atleast 6 characters long.' })
    .max(24, { message: 'Password should be lower than 24 characters.' }),
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
    const registerPayload = validateRegisterPayload(req);

    const { exists } = await checkIfUserExists(registerPayload.email);

    if (exists) {
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
