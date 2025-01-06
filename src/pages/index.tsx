
import ConnectButton from "@/components/ConnectButton";
import { useAppKitAccount } from "@reown/appkit/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';
import { useSignMessage } from "wagmi";

const Home: React.FC = () => {
  const { data: session } = useSession()
  const { address, isConnected, caipAddress, status } = useAppKitAccount()
  const { signMessage } = useSignMessage()

  console.log(address, isConnected, caipAddress, status);

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email ?? session?.user?.address} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="flex flex-col space-y-4 max-w-sm mt-3">
      Not signed in <br />
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn("google")}>Sign in with Google</button>
     {!isConnected && <ConnectButton />}
     <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => signMessage({ message: 'hello world' })}>Sign message</button>
      {/* <ConnectRoninWalletMobile /> */}
      {/* <ConnectRoninWalletMobile /> */}
    </div>
  )
}

export default Home;


