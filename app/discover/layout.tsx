import { ReactNode } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { FilterProvider } from '@/utils/filterContext';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="volunteer">
      <FilterProvider>{children}</FilterProvider>
    </ProtectedRoute>
  );
}
