import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import themeToken from '@/theme/themeConfig'
import BasicLayout from '@/layout'
import SessionWrapper from '@/components/SessionWrapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider } from 'wagmi'
import { config } from '@/config'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionWrapper>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={themeToken}>
            <BasicLayout>
              <Component {...pageProps} />
            </BasicLayout>
          </ConfigProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionWrapper>
  )
}
