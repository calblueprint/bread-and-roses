'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  fetchFacilityApprovalStatus,
  fetchFacilityFinalizationStatus,
} from '@/api/supabase/queries/permissions';
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

const onboardingExceptions = [
  '/onboarding/finalize',
  '/onboarding/facility/finalize',
  '/onboarding/facility/status',
  '/onboarding/facility/about',
  '/onboarding/facility/details',
  '/onboarding/facility/final-finalize',
  '/onboarding/facility/final-review',
  '/onboarding/facility/site-info',
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

  const [hydrated, setHydrated] = useState<boolean>(false);
  const [ready, setReady] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [isFinalized, setIsFinalized] = useState<boolean | null>(null);

  useEffect(() => {
    async function getFacilityStatuses() {
      if (userRole === 'facility' && session?.user?.id) {
        const approved = await fetchFacilityApprovalStatus(session.user.id);
        const finalized = await fetchFacilityFinalizationStatus(
          session.user.id,
        );
        setIsApproved(approved);
        setIsFinalized(finalized);
        setHydrated(true);
      } else {
        setIsApproved(false);
        setIsFinalized(false);
        setHydrated(true);
      }
    }

    getFacilityStatuses();
  }, [userRole, session, path]);

  useEffect(() => {
    if (!hydrated || !sessionChecked) return;

    // always allow public unauthenticated pages
    if (publicUnauthenticatedRoutes.includes(path)) {
      setReady(true);
      return;
    }

    // block protected pages for logged out users
    if (!session) {
      console.log('[ProtectedRoute] No session → /access-error');
      setRedirecting(true);
      router.replace('/access-error');
      return;
    }

    if (
      userRole === 'facility' &&
      (isApproved === null || isFinalized === null || !hydrated) &&
      !publicUnauthenticatedRoutes.includes(path) &&
      !onboardingExceptions.some(p => path.startsWith(p))
    ) {
      console.log(
        '[ProtectedRoute] Waiting for approval/finalization status, temp loading...',
      );
      return;
    }

    // block access to onboarding or roles if already has role
    if (
      ((path.startsWith('/onboarding') &&
        !onboardingExceptions.some(p => path.startsWith(p))) ||
        path.startsWith('/roles')) &&
      userRole
    ) {
      console.log('[ProtectedRoute] Already has role → /permissions-error');
      setRedirecting(true);
      router.replace('/permissions-error');
      return;
    }

    // Must select role if none and no override is present
    if (!userRole && !allowWithoutRole && !allowAnyRole && !requiredRole) {
      console.log('[ProtectedRoute] No role → /roles');
      setRedirecting(true);
      router.replace('/roles');
      return;
    }

    // User has role, but wrong one
    if (requiredRole && userRole !== requiredRole) {
      console.log('[ProtectedRoute] Wrong role → /permissions-error');
      setRedirecting(true);
      router.replace('/permissions-error');
      return;
    }

    // Must have some role if allowAnyRole is true
    if (allowAnyRole && !userRole) {
      console.log('[ProtectedRoute] allowAnyRole true but no role → /roles');
      setRedirecting(true);
      router.replace('/roles');
      return;
    }

    // block facility users from protected routes if not approved
    if (
      userRole === 'facility' &&
      isApproved === false &&
      !publicUnauthenticatedRoutes.includes(path)
    ) {
      console.log(
        '[ProtectedRoute] Facility not approved → /onboarding/facility/status',
      );
      setRedirecting(true);
      router.replace('/onboarding/facility/status');
      return;
    }

    if (
      userRole === 'facility' &&
      isFinalized === true &&
      path.startsWith('/onboarding')
    ) {
      console.log(
        '[ProtectedRoute] Finalized facility tried to access ANY onboarding → /availability/general',
      );
      setRedirecting(true);
      router.replace('/availability/general');
      return;
    }

    setReady(true);
  }, [
    hydrated,
    sessionChecked,
    session,
    userRole,
    path,
    router,
    requiredRole,
    allowWithoutRole,
    allowAnyRole,
    isApproved,
  ]);

  if (!hydrated || !sessionChecked || (!ready && !redirecting)) return null;

  return <>{children}</>;
}
