import { ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { AvailabilityProvider } from '@/utils/availabilityContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="facility">
      <AvailabilityProvider>{children}</AvailabilityProvider>;
    </ProtectedRoute>
  );
}
