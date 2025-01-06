
import ActionButtonList from "@/components/ActionButton";
import '@reown/appkit-wallet-button/react'
import InfoList from "@/components/InfoList";
import { useAppKitAccount, useAppKitTheme } from "@reown/appkit/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from 'react';
import { useSignMessage } from "wagmi";

const Home: React.FC = () => {
  const { data: session } = useSession()
  const { address, isConnected, caipAddress, status } = useAppKitAccount()
  const { signMessage } = useSignMessage()
  const { themeMode } = useAppKitTheme()

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email ?? session?.user?.address} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="page-container">
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn("google")}>Sign in with Google</button>
      Not signed in <br />
      <h1 className="page-title">Ronin Wagmi Example</h1>

      <div className="appkit-buttons-container">
        <appkit-button />
        <appkit-network-button  />
        <appkit-wallet-button wallet="ronin" />
      </div>

      <ActionButtonList />
      <InfoList />
    </div>

  )
}

export default Home;


