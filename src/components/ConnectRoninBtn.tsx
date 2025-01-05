import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useConnect, useAccount, useSignMessage } from 'wagmi';

const ConnectRoninWalletMobile = () => {
  const { connect, connectors, error, status } = useConnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

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
      {connectors.map((connector) => (
        <button onClick={() => connect({ connector })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={status === 'pending'}
          key={connector.id}>
          {status === 'pending'
            ? 'Connecting...'
            : `Sign in with ${connector.name}`}
        </button>
      ))}

      <button onClick={handleLogin}
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Ronin Wallet - Next Auth
      </button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default ConnectRoninWalletMobile;
