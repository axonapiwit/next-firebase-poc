import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../../contexts/AuthContext'
import { ConfigProvider } from 'antd'
import themeToken from '@/theme/themeConfig'
import BasicLayout from '@/layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConfigProvider theme={themeToken}>
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      </ConfigProvider>
    </AuthProvider>
  )
}
