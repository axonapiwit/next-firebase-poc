import ConnectRoninWalletMobile from "@/components/ConnectRoninBtn";
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';

const Home: React.FC = () => {

  const { data: session } = useSession()

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
      <ConnectRoninWalletMobile />
    </div>
  )
}

export default Home;


