import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useConnect, useAccount, useSignMessage } from 'wagmi';

const ConnectRoninWalletMobile = () => {
  const { connect, connectors, error, status } = useConnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const [roninAppLink, setRoninAppLink] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect if it's a mobile device
  useEffect(() => {
    const userAgent = navigator.userAgent
    setIsMobile(/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent));
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      // Construct a deep link for the Ronin wallet app on mobile
      const mobileLink = `ronin://connect?address=${address}`;
      setRoninAppLink(mobileLink);
    }
  }, [isConnected, address]);

  const handleLogin = async () => {
    if (!address) return;

    const message = `Login to MyApp`;
    try {
      const signature = await signMessageAsync({ message });

      // Use NextAuth credentials provider to sign in
      await signIn('credentials', { address, signature, redirect: false });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      {/* {connectors.map((connector) => (
        <button onClick={() => connect({ connector })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={status === 'pending'}
          key={connector.id}>
          {status === 'pending'
            ? 'Connecting...'
            : `Sign in with ${connector.name}`}
        </button>
      ))} */}

      {isMobile ? (
        roninAppLink ? (
          <button
            onClick={() => {
              window.location.href = roninAppLink;
            }}
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open Ronin Wallet App
          </button>
        ) : (
          <p>Loading mobile link...</p>
        )
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign in with Ronin Wallet - Next Auth
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default ConnectRoninWalletMobile;
