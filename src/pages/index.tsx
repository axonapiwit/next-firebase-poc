import React, { useEffect } from 'react';
import { auth } from '@/libs/firebase/config';
import { useAuth } from '../../contexts/AuthContext';

const Home: React.FC = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        user.getIdToken(true) // Force refresh token every hour
          .then((token) => {
            console.log('Token refreshed:', token);
          })
          .catch((error) => {
            console.error('Error refreshing token:', error);
          });
      }, 3600000); // 1 hour

      return () => clearInterval(interval);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
}

export default Home;


// import { useAuthState } from 'react-firebase-hooks/auth'

// import { useRouter } from 'next/navigation';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/libs/firebase/config';
// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [user] = useAuthState(auth);
//   const router = useRouter()
//   const [userSession, setUserSession] = useState<boolean | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const session = sessionStorage.getItem('user');
      
//       setUserSession(Boolean(userSession));
//     }
//   }, []);
  
//   console.log(Boolean(userSession));

//   useEffect(() => {
//     if (!user && !userSession) {
//       router.push('/login')
//     }
//   }, [user, userSession, router]);

//   console.log({ user })

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <button onClick={() => {
//         signOut(auth)
//         sessionStorage.removeItem('user')
//       }}>
//         Log out
//       </button>
//     </main>
//   )
// }