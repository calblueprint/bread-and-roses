'use client';

// import { useRouter } from 'next/navigation';
import { useSession } from '@/utils/AuthProvider';

export default function SessionDemo() {
  const { session, signOut } = useSession();

  if (session === undefined) return <p>Loading...</p>;

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome, {session.user?.email}!</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}
