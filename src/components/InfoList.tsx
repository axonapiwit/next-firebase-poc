import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitNetwork
} from '@/config'
import { useEffect, useState } from 'react'

export function InfoList() {
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for the component to mount on the client
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const accountState = useAppKitAccount()
  const networkState = useAppKitNetwork()
  const themeState = useAppKitTheme()
  const appKitState = useAppKitState()
  const eventsState = useAppKitEvents()
  const walletState = useWalletInfo()

  // Return null on the server to prevent hydration mismatch
  if (!isHydrated) {
    return null
  }

  return (
    <div className="code-container-wrapper">
      <section className="code-container">
        <h2 className="code-container-title">useAppKitAccount()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(accountState, null, 2)}</pre>
        </div>
      </section>

      <section className="code-container">
        <h2 className="code-container-title">useAppKitNetwork()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(networkState, null, 2)}</pre>
        </div>
      </section>

      <section className="code-container">
        <h2 className="code-container-title">useAppKitTheme()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(themeState, null, 2)}</pre>
        </div>
      </section>

      <section className="code-container">
        <h2 className="code-container-title">useAppKitState()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(appKitState, null, 2)}</pre>
        </div>
      </section>

      <section className="code-container">
        <h2 className="code-container-title">useAppKitEvents()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(eventsState, null, 2)}</pre>
        </div>
      </section>

      <section className="code-container">
        <h2 className="code-container-title">useWalletInfo()</h2>
        <div className="code-container-content">
          <pre>{JSON.stringify(walletState, null, 2)}</pre>
        </div>
      </section>
    </div>
  )
}

export default InfoList
