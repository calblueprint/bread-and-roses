'use client';

//temporary page
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push('/onboarding/facility/basic-information')}
      >
        Facility Onboarding
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push('/onboarding/role-selection')}
      >
        Volunteer Onboarding
      </button>
    </div>
  );
}
