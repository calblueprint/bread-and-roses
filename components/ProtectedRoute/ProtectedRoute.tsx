'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/utils/AuthProvider';

interface Props {
  requiredRole?: 'volunteer' | 'facility';
  allowWithoutRole?: boolean;
  allowAnyRole?: boolean;
  children: React.ReactNode;
}

const publicUnauthenticatedRoutes = [
  '/',
  '/signup',
  '/signin',
  '/forgotpassword',
  '/resetpassword',
  '/verification',
  '/access-error',
  '/permissions-error',
];

export default function ProtectedRoute({
  requiredRole,
  allowWithoutRole = false,
  allowAnyRole = false,
  children,
}: Props) {
  const { session, userRole, sessionChecked } = useSession();
  const router = useRouter();
  const path = usePathname();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sessionChecked) return;

    // always allow public unauthenticated pages
    if (publicUnauthenticatedRoutes.includes(path)) {
      setReady(true);
      return;
    }

    // Block protected pages for logged out users
    if (!session) {
      console.log('[ProtectedRoute] No session → /access-error');
      router.replace('/access-error');
      return;
    }

    // block access to onboarding or roles if already has a role
    if (
      ((path.startsWith('/onboarding') &&
        !path.startsWith('/onboarding/finalize')) ||
        path.startsWith('/roles')) &&
      userRole
    ) {
      console.log('[ProtectedRoute] Already has role → /permissions-error');
      router.replace('/permissions-error');
      return;
    }

    // Must select role if none and no override is present
    if (!userRole && !allowWithoutRole && !allowAnyRole && !requiredRole) {
      console.log('[ProtectedRoute] No role → /roles');
      router.replace('/roles');
      return;
    }

    // User has role, but wrong one
    if (requiredRole && userRole !== requiredRole) {
      console.log('[ProtectedRoute] Wrong role → /permissions-error');
      router.replace('/permissions-error');
      return;
    }

    // Must have some role if allowAnyRole
    if (allowAnyRole && !userRole) {
      console.log('[ProtectedRoute] allowAnyRole true but no role → /roles');
      router.replace('/roles');
      return;
    }

    if (session && userRole) {
      router.replace(
        userRole === 'volunteer' ? '/discover' : '/availability/general',
      );

      console.log('[ProtectedRoute]', {
        session,
        userRole,
        sessionChecked,
        path,
        requiredRole,
        allowWithoutRole,
        allowAnyRole,
      });
    }

    setReady(true);
  }, [
    sessionChecked,
    session,
    userRole,
    path,
    router,
    requiredRole,
    allowWithoutRole,
    allowAnyRole,
  ]);

  if (!ready) return null;

  return <>{children}</>;
}
