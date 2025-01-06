import {
  createAppKit,
  useAppKit,
  useAppKitState,
  useAppKitAccount,
  useAppKitTheme,
  useAppKitEvents,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect
} from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { ronin, saigon } from '@reown/appkit/networks'

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

const networks = [ronin, saigon]

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

// Create modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [ronin, saigon],
  metadata: {
    name: 'ronin-example',
    description: 'Ronin Example',
    url: 'https://next-firebase-poc-gilt.vercel.app',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  },
  projectId,
  themeMode: 'dark',
  features: {
    connectMethodsOrder: ['wallet'],
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export {
  modal,
  useAppKit,
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork,
  useDisconnect
}
