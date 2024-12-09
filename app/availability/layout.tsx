import { ReactNode } from 'react';
import { AvailabilityProvider } from '@/utils/availabilityContext';

export default function Layout({ children }: { children: ReactNode }) {
  return <AvailabilityProvider>{children}</AvailabilityProvider>;
}
