interface AuthFormWrapper {
  children: React.ReactNode;
}

export default function AuthFormWrapper({ children }: AuthFormWrapper) {
  return (
    <section className="md:bg-white text-center mb-6 md:px-7 md:rounded md:py-10 md:shadow-jira w-full">
      {children}
    </section>
  );
}
