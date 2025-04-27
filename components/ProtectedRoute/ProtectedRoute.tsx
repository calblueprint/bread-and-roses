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

  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [isFinalized, setIsFinalized] = useState<boolean | null>(null);

  useEffect(() => {
    async function getFacilityStatuses() {
      if (userRole === 'facility' && session?.user?.id) {
        const approved = await fetchFacilityApprovalStatus(session.user.id);
        const finalized = await fetchFacilityFinalizationStatus(
          session.user.id,
        );

        console.log('[ProtectedRoute] Fresh approval status:', approved);
        console.log('[ProtectedRoute] Fresh finalization status:', finalized);

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
    console.log('--- ProtectedRoute Debug ---');
    console.log('hydrated:', hydrated);
    console.log('sessionChecked:', sessionChecked);
    console.log('session:', session);
    console.log('userRole:', userRole);
    console.log('isApproved:', isApproved);
    console.log('path:', path);
    console.log('-----------------------------');
    setTimeout(() => {}, 100);
  }, [hydrated, sessionChecked, session, userRole, isApproved, path]);

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

    /*
    // prevent approved facilities from accessing onboardingExceptions
    if (
      userRole === 'facility' &&
      isApproved &&
      !onboardingExceptions.some(p => path.startsWith(p))
    ) {
      console.log(
        '[ProtectedRoute] Approved facility tried to access onboarding → /availability/general',
      );
      router.replace('/availability/general');
      return;
    } */

    // block access to onboarding or roles if already has role
    if (
      ((path.startsWith('/onboarding') &&
        !onboardingExceptions.some(p => path.startsWith(p))) ||
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

    // Must have some role if allowAnyRole is true
    if (allowAnyRole && !userRole) {
      console.log('[ProtectedRoute] allowAnyRole true but no role → /roles');
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

  if (!hydrated || !sessionChecked || !ready) return null;

  return <>{children}</>;
}
