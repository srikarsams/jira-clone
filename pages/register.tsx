/* eslint-disable @next/next/no-img-element */
export default function RegisterPage() {
  return (
    <div className="h-screen flex flex-col justify-between items-center md:bg-whitish px-7 relative">
      <div className="flex flex-col flex-1 mb-5 max-w-xs md:max-w-sm items-center">
        <header className="py-5 md:py-10">
          <h1 className="font-bold text-4xl tracking-wider text-jira-blue uppercase text-center">
            collasian
          </h1>
        </header>

        <section className="md:bg-white text-center mb-6 md:px-7 md:rounded md:py-10 md:shadow-jira">
          <p className="font-bold text-sm text-gray-500 text-center mb-7">
            Sign up for your account
          </p>
          <input
            className="border shadow-inner bg-gray-200 rounded px-3 py-2 w-full text-sm mb-4 focus:outline-jira-blue focus:bg-white"
            type="text"
            placeholder="Enter email address"
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
          <button className="w-full py-2 text-sm font-bold text-white bg-jira-blue rounded mb-6">
            Sign Up
          </button>
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
      <img
        className="absolute hidden bottom-0 left-0 lg:block w-1/4"
        src="/images/default_left.svg"
        alt="Decorational"
      />
      <img
        className="absolute hidden bottom-0 right-0 lg:block w-1/4"
        src="/images/default_right.svg"
        alt="Decorational"
      />
    </div>
  );
}
