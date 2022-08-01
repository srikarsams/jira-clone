import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'classnames';

import { Input } from 'components/input';
import { useAuthForm } from 'hooks/useAuthForm';
import AuthWrapper from 'components/auth-wrapper';
import AuthFormWrapper from 'components/auth-form-wrapper';
import TextLink from 'components/text-link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { error, formHandler } = useAuthForm({
    email,
    password,
    type: 'login',
  });

  function emailHandler(e: ChangeEvent<HTMLInputElement>) {
    // if user tries to edit email wnen password field is enabled, remove the password field by moving
    // the user back to login page without email param
    if (router.query?.email) {
      router.replace('/login');
    } else {
      setEmail(e.target.value);
    }
  }

  useEffect(() => {
    // if user visits the login page with email query param,
    // set the email input with corresponding value
    if (router.query?.email && router.query.email !== email) {
      setEmail(router.query.email as string);
    }
  }, [router, email]);

  useEffect(() => {
    // for focusing the password input post email has been verified
    if (router.query?.email) {
      passwordRef?.current?.focus();
    }
  }, [router]);

  return (
    <AuthWrapper>
      <Head>
        <title>Log in to continue - Log in with Collasian account</title>
        <meta
          name="description"
          content="Log in to Jira, Confluence, and all other Collasian Cloud products here. Not an Collasian user? Sign up for free."
        />
      </Head>
      <AuthFormWrapper>
        <form onSubmit={formHandler}>
          <p className="font-bold text-sm text-gray-500 text-center mb-7">
            Log in to your account
          </p>
          <Input
            type="email"
            placeholder="Enter email"
            required={true}
            value={email}
            changeHandler={emailHandler}
            error={error.fieldErrors?.email}
            wrapperClassName="mb-4"
          />
          <Input
            wrapperClassName={classNames({
              'mb-4': router.query?.email,
              'h-0 opacity-0 pointer-events-none': !router.query?.email,
            })}
            type="password"
            placeholder="Enter password"
            required={!!router.query?.email}
            value={password}
            changeHandler={(e) => setPassword(e.target.value)}
            error={error.fieldErrors?.password}
            ref={passwordRef}
          />

          <button
            className="w-full py-2 text-sm font-bold text-white bg-jira-blue rounded my-6"
            type="submit"
          >
            {router.query?.email ? 'Log in' : 'Continue'}
          </button>
        </form>

        <hr className="mb-6" />
        <TextLink href="/register">Sign up for an account</TextLink>
      </AuthFormWrapper>

      <div className="text-xs mt-auto flex justify-center md:mt-0 gap-1">
        <a className="text-jira-blue" href="#">
          Privacy Policy
        </a>
        <span>•</span>
        <a className="text-jira-blue" href="#">
          Terms of Service
        </a>
      </div>
    </AuthWrapper>
  );
}
