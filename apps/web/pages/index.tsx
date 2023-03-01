//import { Button } from "ui";
import { ethers } from "ethers";
import { getDefaultProvider } from "ethers";
import { useEffect } from "react";
import ConnectModal from "../components/ConnectModal";
import { formatEther, zeroPad } from "ethers/lib/utils.js";
import { ConnectionProvider, useConnection } from "../hooks/useConnection";
import { useHasMounted } from "../hooks/useHasMounted";

// const { chains, provider, webSocketProvider } = configureChains(
//   [
//     mainnet,
//     {
//       id: 1337,
//       name: "Truffle",
//       rpcUrls: {
//         default: {
//           http: ["http://127.0.0.1:9545/"],
//         },
//         public: {
//           http: ["http://127.0.0.1:9545/"],
//         },
//       },
//       testnet: true,
//       network: "local",
//       nativeCurrency: {
//         name: "ETHEREUM",
//         symbol: "ETH",
//         decimals: 18,
//       },
//     },
//   ],
//   [
//     publicProvider(),
//     // jsonRpcProvider({
//     //   priority:0,
//     //   rpc: (chain) => ({ http: "http://127.0.0.1:9545/" }),
//     // }),
//   ]
// );

// const client = createClient({
//   autoConnect: true,
//   connectors: [new InjectedConnector({ chains })],
//   provider,
// });

export default function Web() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <ConnectionProvider>
      <div>
        <ConnectModal />
      </div>
    </ConnectionProvider>
  );
}
