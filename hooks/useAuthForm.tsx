import React from 'react';
import { User } from '@prisma/client';
import { NextRouter, useRouter } from 'next/router';

import { EmailStatus } from 'pages/api/auth/check-email';
import { APIError, RegisterKeys } from 'types';

import { get, post } from 'utils/fetch';

type FormError = APIError<typeof RegisterKeys>;

type AuthSuccess = Partial<User>;

interface useAuthFormArgs extends AuthSuccess {
  type?: 'login' | 'register';
}

export function useAuthForm({
  email,
  password,
  type = 'register',
}: useAuthFormArgs) {
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
            setError(
              type === 'register'
                ? {
                    fieldErrors: {
                      email: 'User already exists',
                    },
                  }
                : { fieldErrors: {} }
            );
            if (type === 'login') {
              router.push(`${router.pathname}?email=${email}`);
            }
          } else {
            if (type === 'register') {
              router.push(`${router.pathname}?email=${email}`);
            }
            setError(
              type === 'register'
                ? { fieldErrors: {} }
                : {
                    fieldErrors: {
                      email: 'User not found',
                    },
                  }
            );
          }
        } else {
          setError(emailValidationRes as FormError);
        }
      } catch (error) {
        setError({ fieldErrors: { form: 'Something went wrong!' } });
      }
    } else {
      try {
        const signUpRes: AuthSuccess | FormError = await post(
          `/api/auth/${type}`,
          JSON.stringify({ email, password })
        );

        if ('email' in signUpRes) {
          router.push(type === 'register' ? '/login' : '/');
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
