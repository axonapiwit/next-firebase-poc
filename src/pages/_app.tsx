import SessionWrapper from '@/components/SessionWrapper'
import BasicLayout from '@/layout'
import '@/styles/globals.css'
import themeToken from '@/theme/themeConfig'
import { QueryClient } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'

import ContextProvider from '../../contexts'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps & { cookies?: string }) {
  return (
    <SessionWrapper>
      <ConfigProvider theme={themeToken}>
        <BasicLayout>
          <ContextProvider cookies={pageProps.cookies}>
            <Component {...pageProps} />
          </ContextProvider>
        </BasicLayout>
      </ConfigProvider>
    </SessionWrapper>
  )
}

export async function getServerSideProps(context: { req: { headers: { cookie: string } } }) {
  const cookies = context.req.headers.cookie || null;
  return {
    props: { cookies },
  };
}