import { ReactNode } from 'react';
import { OnboardingProvider } from '@/utils/onboardingContext';

export default function Layout({ children }: { children: ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
