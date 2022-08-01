/* eslint-disable @next/next/no-img-element */
interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="h-screen flex flex-col justify-between items-center md:bg-whitish px-7 relative">
      <div className="flex flex-col flex-1 mb-5 max-w-xs md:max-w-sm items-center">
        <header className="py-5 md:py-10">
          <h1 className="font-bold text-4xl tracking-wider text-jira-blue uppercase text-center">
            collasian
          </h1>
        </header>
        {children}
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
