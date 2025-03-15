'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface RouterLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function RouterLink({
  href,
  children,
  className,
}: RouterLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
