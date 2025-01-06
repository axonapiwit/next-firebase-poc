import '@reown/appkit-wallet-button/react'

export default function ConnectButton() {
  return (
    <>
      <appkit-button />
      <appkit-wallet-button wallet="ronin" />
    </>
  )
}