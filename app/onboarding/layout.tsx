import { ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { OnboardingProvider } from '@/utils/onboardingContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowWithoutRole>
      <OnboardingProvider>{children}</OnboardingProvider>;
    </ProtectedRoute>
  );
}
