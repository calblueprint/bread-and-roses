import { ReactNode } from 'react';
import { FacilityOnboardingProvider } from '@/utils/facilityOnboardingContext';

export default function Layout({ children }: { children: ReactNode }) {
  return <FacilityOnboardingProvider>{children}</FacilityOnboardingProvider>;
}
