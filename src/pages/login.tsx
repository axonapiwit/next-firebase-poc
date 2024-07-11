import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/libs/firebase/config';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const router = useRouter()

  const provider = new GoogleAuthProvider();
  const handleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      console.log({ result })
      sessionStorage.setItem('user', 'true')
      router.push('/')

      if (!result || !result.user) {
        throw new Error('Google sign in failed');
      }
      return result.user.uid;
    } catch (error) {
      console.error('Error signing in with Google', error);
      throw error;  // Propagate the error to handle it in the UI
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Log In</h1>
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Login with Google
        </button>
      </div>
    </div>
  )
}

export default Login;