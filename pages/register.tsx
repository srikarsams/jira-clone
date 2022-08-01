import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'classnames';

import { Input } from 'components/input';
import { useRegisterForm } from 'hooks/useRegisterForm';

/* eslint-disable @next/next/no-img-element */
export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { error, formHandler } = useRegisterForm({ email, password });

  function emailHandler(e: ChangeEvent<HTMLInputElement>) {
    // if user tries to edit email wnen password field is enabled, remove the password field by moving
    // the user back to register page without email param
    if (router.query?.email) {
      router.replace('/register');
    } else {
      setEmail(e.target.value);
    }
  }

  useEffect(() => {
    // if user visits the register page with email query param,
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
    <div className="h-screen flex flex-col justify-between items-center md:bg-whitish px-7 relative">
      <Head>
        <title>Sign up - Log in with Collasian account</title>
        <meta
          name="description"
          content="Log in to Jira, Confluence, and all other Collasian Cloud products here. Not an Collasian user? Sign up for free."
        />
      </Head>
      <div className="flex flex-col flex-1 mb-5 max-w-xs md:max-w-sm items-center">
        <header className="py-5 md:py-10">
          <h1 className="font-bold text-4xl tracking-wider text-jira-blue uppercase text-center">
            collasian
          </h1>
        </header>

        <section className="md:bg-white text-center mb-6 md:px-7 md:rounded md:py-10 md:shadow-jira">
          <form onSubmit={formHandler}>
            <p className="font-bold text-sm text-gray-500 text-center mb-7">
              Sign up for your account
            </p>
            <Input
              type="email"
              placeholder="Enter email address"
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

            <p className="text-xs text-gray-500 mb-4 pl-2 text-left">
              By signing up, I accept the Collasian{' '}
              <a className="text-jira-blue" href="#">
                Cloud Terms of Service
              </a>{' '}
              and acknowledge the{' '}
              <a className="text-jira-blue" href="#">
                Privacy Policy
              </a>
              .
            </p>
            <button
              className="w-full py-2 text-sm font-bold text-white bg-jira-blue rounded mb-6"
              type="submit"
            >
              {router.query?.email ? 'Sign Up' : 'Continue'}
            </button>
          </form>

          <hr className="mb-6" />
          <a className="text-jira-blue text-sm" href="#">
            Already have an Collasian account? Log in
          </a>
        </section>

        <p className="text-xs text-gray-500 mt-auto text-center md:mt-0">
          This page is protected by reCAPTCHA and the Google{' '}
          <a className="text-jira-blue" href="#">
            Privacy Policy
          </a>{' '}
          and
          <a className="text-jira-blue" href="#">
            Terms of Service
          </a>{' '}
          apply
        </p>
      </div>

      <footer className="text-center mb-4 md:mb-8 w-full max-w-xs md:max-w-sm">
        <hr className="mb-3 md:mb-7" />
        <h2 className="font-bold text-xl tracking-wider text-logo-fill-black uppercase">
          collasian
        </h2>
        <p className="text-xs text-gray-500">
          One account for Jira, Confluence, Trello and{' '}
          <a href="#" className="text-jira-blue">
            more
          </a>
          .
        </p>
      </footer>

      {/* Decorative images */}
      <img
        className="absolute hidden bottom-0 left-0 lg:block w-1/4 pointer-events-none"
        src="/images/default_left.svg"
        alt="Decorational"
      />
      <img
        className="absolute hidden bottom-0 right-0 lg:block w-1/4 pointer-events-none"
        src="/images/default_right.svg"
        alt="Decorational"
      />
    </div>
  );
}
