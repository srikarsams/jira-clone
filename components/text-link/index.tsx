import Link from 'next/link';

interface TextLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function TextLink({ children, href }: TextLinkProps) {
  return (
    <Link href={href}>
      <a className="text-jira-blue text-sm">{children}</a>
    </Link>
  );
}
