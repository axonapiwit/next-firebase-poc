import React, { useEffect, useState } from "react";
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from 'wagmi/connectors'
import { config } from "@/config";

enum ChainIds {
  RoninMainnet = 2020,
  RoninTestnet = 2019,
}

const ConnectRoninWalletButton: React.FC = () => {
  const { connect, connectors, error: connectError, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address, connector } = useAccount();
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  useEffect(() => {
    // Automatically switch to the correct chain if connected
    if (isConnected && connector) {
      connector.getChainId().then(setCurrentChainId).catch(console.error);
    }
  }, [isConnected, connector]);

  const connectRoninWallet = async () => {
    try {
      const isRoninWalletInstalled = connectors.find((c) => c.name === "Ronin Wallet")

      if (!isRoninWalletInstalled) {
        window.open("https://wallet.roninchain.com", "_blank");
        return;
      }
      
      connect({ connector: injected() });
    } catch (error) {
      console.error("Error connecting to Ronin Wallet:", error);
    }
  };

  const switchChain = async () => {
    try {
      if (!connector) return;
      const newChainId =
        currentChainId === ChainIds.RoninMainnet
          ? ChainIds.RoninTestnet
          : ChainIds.RoninMainnet;

      await connector.switchChain?.({ chainId: newChainId });
      setCurrentChainId(newChainId);
    } catch (error) {
      console.error("Error switching chain:", error);
    }
  };

  const formatConnectedChain = (chainId: number | null) => {
    switch (chainId) {
      case ChainIds.RoninMainnet:
        return `Ronin Mainnet - ${chainId}`;
      case ChainIds.RoninTestnet:
        return `Saigon Testnet - ${chainId}`;
      default:
        return `Unknown Chain - ${chainId}`;
    }
  };

  return (
    <div>
      {isConnected ? (
        <>
          <p>
            🎉 Connected as {address}. Current Chain:{" "}
            {formatConnectedChain(currentChainId)}
          </p>
          <button onClick={switchChain}>
            Switch to{" "}
            {currentChainId === ChainIds.RoninMainnet
              ? "Saigon Testnet"
              : "Ronin Mainnet"}
          </button>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectRoninWallet} disabled={isPending}>
          {isPending ? "Connecting..." : "Connect Ronin Wallet"}
        </button>
      )}
      {connectError && (
        <p style={{ color: "red" }}>Error: {connectError.message}</p>
      )}
    </div>
  );
};

export default ConnectRoninWalletButton;
