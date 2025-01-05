import { http } from "viem";
import { ronin, saigon } from "viem/chains";
import { cookieStorage, createConfig, createStorage } from "wagmi";
import type { WalletConnectParameters } from "wagmi/connectors";
import {
  ConnectorError,
  ConnectorErrorType,
  requestRoninWalletConnector,
} from "@sky-mavis/tanto-connect";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
if (!projectId) throw Error("Project ID is undefined - get a project ID from WalletConnect Cloud")

const metadata: WalletConnectParameters['metadata'] = {
  name: 'ROL Ronin',
  description: 'Ronin Example',
  url: 'https://playground.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = createConfig({
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
