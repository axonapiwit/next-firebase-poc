import SessionWrapper from '@/components/SessionWrapper'
import BasicLayout from '@/layout'
import '@/styles/globals.css'
import themeToken from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ContextProvider from '../../contexts'
import { wagmiAdapter } from '@/config'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps & { cookies?: string }) {
  return (
    <SessionWrapper>
      <WagmiProvider config={wagmiAdapter.wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={themeToken}>
            <BasicLayout>
              {/* <ContextProvider cookies={pageProps.cookies}> */}
              <Component {...pageProps} />
              {/* </ContextProvider> */}
            </BasicLayout>
          </ConfigProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionWrapper>
  )
}

export async function getServerSideProps(context: { req: { headers: { cookie: string } } }) {
  const cookies = context.req.headers.cookie || null;
  return {
    props: { cookies },
  };
}