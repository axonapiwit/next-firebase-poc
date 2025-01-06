
// import React, { useEffect, useState } from 'react';
// import {QRCodeSVG} from 'qrcode.react';

// import {
//   ConnectorEvent,
//   requestRoninWalletConnectConnector,
// } from "@sky-mavis/tanto-connect";

// const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
// if (!projectId) throw Error("Project ID is undefined - get a project ID from WalletConnect Cloud")


// interface Connector {
//   connect: () => Promise<{ account: string }>;
//   on: (event: string, callback: (uri: string) => void) => void;
// }

// declare function isMobile(): boolean;

// const ConnectRoninWalletMobile: React.FC = () => {
//   const [connector, setConnector] = useState<Connector | null>(null);
//   const [connectedAddress, setConnectedAddress] = useState<string | undefined>(undefined);
//   const [displayUri, setDisplayUri] = useState<string | null>(null);

//   const wcOptions = {
//     projectId: projectId,
//     metadata: {      
//       name: 'ROL Ronin',
//       description: 'Ronin Example',
//       url: "https://wallet.roninchain.com",
//       icons: ['https://avatars.githubusercontent.com/u/37784886']
//     },
//   };

//   useEffect(() => {
//     requestRoninWalletConnectConnector(wcOptions).then((wcConnector: any) => {
//       setConnector(wcConnector);
//       wcConnector.on(ConnectorEvent.DISPLAY_URI, (uri) => setDisplayUri(uri));
//     });
//   }, []);

//   const connectRoninWallet = async () => {
//     if (!connector) {
//       alert("Connector is not ready");
//       return;
//     }

//     const connectResult = await connector.connect();

//     if (connectResult) {
//       setConnectedAddress(connectResult.account);
//     }
//   };

//   if (connectedAddress === undefined) {
//     return (
//       <div>
//         {displayUri && isMobile() && connector && (
//           <a href={displayUri}>Open mobile app</a>
//         )}
//         {displayUri && !isMobile() && (
//           <>
//             <div>Scan me:</div>
//             <QRCodeSVG  value={displayUri} />
//           </>
//         )}
//         {!displayUri && (
//           <button onClick={connectRoninWallet}>Connect Ronin Wallet</button>
//         )}
//       </div>
//     );
//   }

//   if (connectedAddress) {
//     return `🎉 Ronin Wallet is connected, current address: ${connectedAddress}`;
//   }

//   return null;
// };

// export default ConnectRoninWalletMobile;
