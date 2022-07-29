import React from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';

import { APIError, RegisterKeys } from 'types';
import { EmailSuccess } from 'pages/api/auth/register';

import { get, post } from 'utils/fetch';

type FormError = APIError<typeof RegisterKeys>;

type SignUpSuccess = Partial<User>;

interface useRegisterFormProps {
  email?: string;
  password?: string;
}

export function useRegisterForm({ email, password }: useRegisterFormProps) {
  const router = useRouter();
  const [error, setError] = React.useState<FormError>({ fieldErrors: {} });

  async function formHandler(e: React.FormEvent) {
    e.preventDefault();

    if (!router.query.email) {
      try {
        const emailValidationRes: EmailSuccess | FormError = await get(
          `/api/auth/register?email=${email}`
        );

        if ((emailValidationRes as EmailSuccess)?.ok) {
          router.push(`${router.pathname}?email=${email}`);
          setError({ fieldErrors: {} });
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

        if ((signUpRes as SignUpSuccess)?.email) {
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
