import React from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';

import { EmailStatus } from 'pages/api/auth/check-email';
import { APIError, RegisterKeys } from 'types';

import { get, post } from 'utils/fetch';

type FormError = APIError<typeof RegisterKeys>;

type SignUpSuccess = Partial<User>;

export function useRegisterForm({ email, password }: SignUpSuccess) {
  const router = useRouter();
  const [error, setError] = React.useState<FormError>({ fieldErrors: {} });

  async function formHandler(e: React.FormEvent) {
    e.preventDefault();

    /* 
      this is to check whether email exists
      if exists, throw an error
      else ask for password 
    */
    if (!router.query.email) {
      try {
        const emailValidationRes: EmailStatus | FormError = await get(
          `/api/auth/check-email?email=${email}`
        );

        if ('exists' in emailValidationRes) {
          if (emailValidationRes.exists) {
            setError({
              fieldErrors: {
                email: 'User already exists',
              },
            });
          } else {
            router.push(`${router.pathname}?email=${email}`);
            setError({ fieldErrors: {} });
          }
        } else {
          setError(emailValidationRes as FormError);
        }
      } catch (error) {
        setError({ fieldErrors: { form: 'Something went wrong!' } });
      }
    } else {
      try {
        const signUpRes: SignUpSuccess | FormError = await post(
          `/api/auth/register`,
          JSON.stringify({ email, password })
        );

        if ('email' in signUpRes) {
          router.push('/login');
        } else {
          setError(signUpRes as FormError);
        }
      } catch (error) {
        setError({ fieldErrors: { form: 'Something went wrong!' } });
      }
    }
  }

  return { formHandler, error };
}
