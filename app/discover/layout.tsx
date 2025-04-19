import { ReactNode } from 'react';
import { FilterProvider } from '@/utils/filterContext';

export default function Layout({ children }: { children: ReactNode }) {
  return <FilterProvider>{children}</FilterProvider>;
}
