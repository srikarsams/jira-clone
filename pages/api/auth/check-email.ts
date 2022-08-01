import type { NextApiRequest, NextApiResponse } from 'next';
import { z, ZodError } from 'zod';

import { APIError, RegisterKeys } from 'types';
import { checkIfUserExists } from 'utils/api';

export interface EmailStatus {
  exists: boolean;
}

const checkEmailPayloadValidator = z.object({
  email: z.string().email({ message: 'Invalid Email. Please check again' }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIError<typeof RegisterKeys> | EmailStatus>
) {
  if (req.method !== 'GET') {
    res
      .status(405)
      .json({ fieldErrors: { form: 'Only GET requests allowed' } });
    return;
  }
  try {
    const emailPayload = validateRegisterEmailPayload(
      req.query.email as string
    );

    const payload = await checkIfUserExists(emailPayload.email);

    res.status(200).json(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json(error.flatten());
      return;
    }
    res.status(400).json({ fieldErrors: { email: (error as Error).message } });
  }
}

function validateRegisterEmailPayload(email: string) {
  return checkEmailPayloadValidator.parse({ email });
}
