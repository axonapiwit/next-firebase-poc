
import { useAuthState } from 'react-firebase-hooks/auth'

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/libs/firebase/config';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const [userSession, setUserSession] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('user');
      
      setUserSession(Boolean(userSession));
    }
  }, []);
  
  console.log(Boolean(userSession));

  useEffect(() => {
    if (!user && !userSession) {
      router.push('/login')
    }
  }, [user, userSession, router]);

  console.log({ user })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => {
        signOut(auth)
        sessionStorage.removeItem('user')
      }}>
        Log out
      </button>
    </main>
  )
}